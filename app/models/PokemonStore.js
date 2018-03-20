import { types, getParent, flow } from 'mobx-state-tree';
import { getItem, setItem } from '../helpers/localStorage';
import { API_URL } from '../constants';
import {
	pokemonPlainTypes,
	pokemonsMeta,
	pokemonAvatarMeta,
	state
} from './Types';
import { Pokemon } from './Pokemon';
import { PokemonType } from './PokemonType';
import { Pagination } from './Pagination';

export const PokemonStore = types
	.model('PokemonStore', {
		isLoading: true,
		state,
		hardCache: false,
		types: types.map(PokemonType),
		typesIsFull: false,
		typesTotal: 20,
		userLimit: types.maybe(types.number),
		filter: types.frozen,
		pokemons: types.map(Pokemon),
		pagination: Pagination,
		pokemonsMeta: types.frozen
	})
	.views(self => ({
		get id() {
			return self.pkdx_id;
		},
		get mainStore() {
			return getParent(self);
		},
		get limit() {
			const { limit } = self.pokemonsMeta;
			return self.userLimit ? self.userLimit : limit;
		},
		get total() {
			if (self.isDefaultFilter) {
				return self.pokemonsMeta.total_count;
			} else {
				return self.getPokemonsByFilter().length;
			}
		},
		get page() {
			return self.pagination.current;
		},
		get offset() {
			return (self.page - 1) * self.limit;
		},
		get isDefaultFilter() {
			const { name, types } = self.filter;
			return types.length === 0 && (name === '' || typeof name !== 'string');
		},
		get meta() {
			const meta = [...pokemonsMeta];
			meta.unshift(pokemonAvatarMeta);
			return meta;
		},
		get sortedAvailablePokemons() {
			return sortPokemons(self.pokemons.values());
		},
		getPokemonsByFilter() {
			console.log(self.isDefaultFilter);
			if (self.isDefaultFilter) {
				return defaultOrder(self.pokemons.values());
			}
			const { name, types } = self.filter;
			if (name) {
				return filterByName(self.pokemons.values(), name);
			}
			if (types) {
				return filterByTypes(self.pokemons.values(), types);
			}
		},
		getPokemonsByFilterPerPage() {
			return self.getPokemonsByFilter().splice(self.offset, self.limit);
		}
	}))
	.actions(self => {
		function setFilter(filter) {
			console.log(JSON.stringify(self.filter));
			self.filter = { ...self.filter, ...filter };
			console.log(JSON.stringify(self.filter));
			// need to clear default page
			self.pagination.setPage(1);
		}
		function setUserLimit(limit) {
			self.userLimit = limit;
			// need to clear default page
			self.pagination.setPage(1);
			console.log(self.limit);
		}
		function clearFilter() {
			self.filter = {
				types: [],
				name: ''
			};
		}
		function updatePokemons(json, offset) {
			// offset should be the same when fetching started
			json.forEach((pokemonFullJson, i) => {
				const apiIndex = i + offset;
				console.log(offset);
				self.updatePokemonTypes(pokemonFullJson);
				setItem(`pokemon${apiIndex}`, pokemonFullJson);
				const pokemonShrinkedJson = Object.keys(pokemonPlainTypes).reduce(
					(acc, key) => {
						acc[key] = pokemonFullJson[key];
						return acc;
					},
					{
						index: apiIndex,
						types: pokemonFullJson.types.map(type => type.resource_uri)
					}
				);
				console.log(
					apiIndex,
					pokemonShrinkedJson.pkdx_id,
					pokemonShrinkedJson.name
				);
				self.pokemons.put(pokemonShrinkedJson);
			});
		}
		function updatePokemonTypes(pokemon) {
			if (!self.typesIsFull) {
				// api of types has not been fetched completely
				pokemon.types.forEach(type => self.types.put(type));
			}
		}
		function updateMeta(json) {
			setItem('meta', json);
			self.pokemonsMeta = json;
		}
		function updateTypes(json) {
			json.objects.forEach(({ resource_uri, name }) => {
				self.types.put({ resource_uri, name });
			});
			self.typesIsFull = true;
		}
		const asyncChangeType = flow(function*(filteredPokemons) {
			console.log(filteredPokemons.length);
			yield new Promise();
		});
		const loadPokemons = flow(function*() {
			self.state = 'pending';
			const startIndex = self.offset;
			const endIndex = self.offset + self.limit;
			try {
				let queryIsCached = true;
				const cachedPokemons = [];
				const cachedMeta = getItem('meta', { async: false });
				if (cachedMeta) {
					for (let index = startIndex; index < endIndex; index++) {
						const cachedPokemon = getItem(`pokemon${index}`, { async: false });
						if (cachedPokemon) {
							cachedPokemons.push(cachedPokemon);
						} else {
							queryIsCached = false;
							// avoid unnessary accessing localStorage
							break;
						}
					}
				} else {
					queryIsCached = false;
				}
				if (queryIsCached) {
					updatePokemons(cachedPokemons, startIndex);
					updateMeta(cachedMeta);
				} else {
					if (!self.hardCache) {
						const url = `${API_URL}pokemon/?limit=${self.limit}&offset=${self.offset}`;
						const json = yield self.mainStore.fetch(url);
						updatePokemons(json.objects, startIndex);
						updateMeta(json.meta);
					}
				}

				self.state = 'done';
			} catch (err) {
				self.state = 'error';
				console.error('Failed to load pokemons ', err);
			}
		});
		const loadTypes = flow(function*() {
			const url = `${API_URL}type/?limit=${self.typesTotal}&offset=0`;
			try {
				const json = yield self.mainStore.fetch(url);
				updateTypes(json);
			} catch (err) {
				console.error('Failed to load types ', err);
			}
		});

		return {
			updateTypes,
			updateMeta,
			updatePokemonTypes,
			updatePokemons,
			setFilter,
			setUserLimit,
			clearFilter,
			asyncChangeType,
			loadTypes,
			loadPokemons
		};
	});

function defaultOrder(pokemons) {
	return pokemons.reduce((acc, pokemon) => {
		// console.log('-', pokemon.index, pokemon.pkdx_id, pokemon.name);
		acc[pokemon.index] = pokemon;
		return acc;
	}, []);
}

function filterByName(pokemons, name) {
	// TODO:
	// implement fuzzy search
	return pokemons.filter(pokemon =>
		pokemon.name.toLowerCase().match(name.toLowerCase())
	);
}

function filterByTypes(pokemons, types) {
	return pokemons.filter(pokemon =>
		pokemon.types.find(type => types.includes(type.name.toLowerCase()))
	);
}

function sortPokemons(pokemons) {
	return pokemons.sort(
		(a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1)
	);
}
