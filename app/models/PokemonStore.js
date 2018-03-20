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
import { FilterStore } from './FilterStore';
import { Pagination } from './Pagination';

console.log(FilterStore, Pagination);
export const PokemonStore = types
	.model('PokemonStore', {
		isLoading: true,
		state,
		hardCache: false,
		types: types.map(PokemonType),
		typesIsFull: false,
		typesTotal: 20,
		filter: FilterStore,
		userLimit: types.maybe(types.number),
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
			return self.filter.total;
		},
		get page() {
			return self.pagination.current;
		},
		get offset() {
			return (self.page - 1) * self.limit;
		},
		get meta() {
			const meta = [...pokemonsMeta];
			meta.unshift(pokemonAvatarMeta);
			return meta;
		}
	}))
	.actions(self => {
		function setUserLimit(limit) {
			self.userLimit = limit;
			// need to clear default page
			self.pagination.setPage(1);
			console.log(self.limit);
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
						updatePokemons(json.objects, json.meta.offset);
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
			setUserLimit,
			asyncChangeType,
			loadTypes,
			loadPokemons
		};
	});

function sortPokemons(pokemons) {
	return pokemons.sort(
		(a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1)
	);
}
