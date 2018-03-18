import { types, getParent, flow } from 'mobx-state-tree';
import { API_URL } from '../constants';
import { pokemonPlainTypes, pokemonsMeta, pokemonAvatarMeta, state } from './Types';
import { Pokemon } from './Pokemon';
import { PokemonType } from './PokemonType';
import { Pagination } from './Pagination';

export const PokemonStore = types
	.model('PokemonStore', {
		isLoading: true,
		state,
		types: types.map(PokemonType),
		typesIsFull: false,
		typesTotal: 20,
		filter: types.frozen,
		pokemons: types.map(Pokemon),
		pagination: Pagination,
		pokemonsMeta: types.frozen,
		limit: 10,
		total: 10
	})
	.views(self => ({
		get totalPages() {
			return Math.ceil(self.total / self.limit);
		},
		get page() {
			return self.pagination.current;
		},
		get offset() {
			return (self.page - 1) * self.limit;
		},
		get pokemonsDefaultOrder() {
			return self.pokemons.values().reduce((acc, pokemon) => {
				acc[pokemon.index] = pokemon;
				return acc;
			}, []);
		},
		getPokemonsByType(type) {
			console.log(type);
			const pokemonsByType = self.pokemons.values().filter(pokemon => {
				const types = pokemon.types.map(type => type.name.toLowerCase());
				return types.includes(type);
			});
			console.log(pokemonsByType);
			return pokemonsByType;
		},
		getPokemonsByFilter() {
			if (!self.filter) {
				console.log(self.pokemonsDefaultOrder);
				setTimeout(() => {
					// rename to makeTotalDefault
					if (self.pokemonsMeta) {
						self.changeTotal(self.pokemonsMeta.total_count);
					}
				}, 0);

				return self.pokemonsDefaultOrder.filter(item => item);
			}
			const { name, types } = self.filter;
			if (name) {
				const filteredPokemons = self.pokemons.values().filter(pokemon => pokemon.name.toLowerCase().match(name.toLowerCase()));
				setTimeout(() => {
					self.changeTotal(filteredPokemons.length);
				}, 0);
				return filteredPokemons;
			}
		},
		getPokemonsByFilterPerPage() {
			return self.getPokemonsByFilter().slice(self.offset, self.limit);
		},
		get pokemonsPerPage() {
			const ids = self.frame.map(id => {
				const pokemon = self.pokemonsDefaultOrder[id];
				// console.log(id, pokemon ? pokemon.types : 'no pokemon');
				return pokemon ? pokemon.pkdx_id : null;
			});
			return ids.filter(item => item).map(id => self.pokemons.get(id));
		},
		get meta() {
			const meta = [...pokemonsMeta];
			meta.unshift(pokemonAvatarMeta);
			return meta;
		},
		get frame() {
			// get empty collection for current page
			return [...Array(self.limit).keys()].map(i => i + self.offset);
		},
		get id() {
			return self.pkdx_id;
		},
		get mainStore() {
			return getParent(self);
		},
		get sortedAvailablePokemons() {
			return sortPokemons(self.pokemons.values());
		}
	}))
	.actions(self => {

		function setFilter({ types, name }) {
			self.filter = { types, name };
		}
		function clearFilter() {
			self.filter = null;
		}
		function changeTotal(total) {
			self.total = total;
		}
		function changeLimit(limit) {
			self.limit = limit;
		}
		function changeOffset(offset) {
			self.offset = offset;
		}
		function updatePokemons(json) {
			json.forEach((pokemonFullJson, i) => {
				try {
					// self.pokemonsDefaultOrder[i+self.offset] = pokemonFullJson.pkdx_id;
				} catch (e) {
					console.error(e);
				}
				const pokemonShrinkedJson = Object.keys(
					pokemonPlainTypes
				).reduce((acc, key) => {
					acc[key] = pokemonFullJson[key];
					return acc;
				}, {});
				self.updateTypes(pokemonFullJson);
				pokemonShrinkedJson.types = pokemonFullJson.types.map(type => type.resource_uri);
				pokemonShrinkedJson.index = i + self.offset;
				self.pokemons.put(pokemonShrinkedJson);
			});
		}
		function updateTypes(pokemon) {
			if (!self.typesIsFull) {
				// api of types has not been fetched completely
				pokemon.types.forEach(type => self.types.put(type));
			}
		}
		function updateMeta(json) {
			self.pokemonsMeta = json;
			self.limit = json.limit;
			self.total = json.total_count;
		}
		const asyncChangeType = flow(function* (filteredPokemons) {
			console.log(filteredPokemons.length);
			yield new Promise();
		});
		const loadTypes = flow(function* loadPokemons() {
			const url = `${API_URL}type/?limit=${self.typesTotal}&offset=0`;
			try {
				const json = yield self.mainStore.fetch(url);
				json.objects.forEach(({resource_uri, name}) => {
					self.types.put({ resource_uri, name });
				});
				self.typesIsFull = true;
			} catch (err) {
				console.error('Failed to load types ', err);
			}
		});
		const loadPokemons = flow(function* loadPokemons() {
			self.state = 'pending';
			const url = `${API_URL}pokemon/?limit=${self.limit}&offset=${self.offset}`;
			try {
				const json = yield self.mainStore.fetch(url);
				updatePokemons(json.objects);
				updateMeta(json.meta);
				self.state = 'done';
			} catch (err) {
				self.state = 'error';
				console.error('Failed to load pokemons ', err);
			}
		});

		return {
			updateMeta,
			updateTypes,
			updatePokemons,
			changeLimit,
			setFilter,
			changeTotal,
			clearFilter,
			asyncChangeType,
			changeOffset,
			loadTypes,
			loadPokemons
		};
	});

function sortPokemons(pokemons) {
	return pokemons
		.filter(b => b.isAvailable)
		.sort((a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1));
}
