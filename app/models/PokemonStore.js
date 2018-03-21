import { types, getParent, flow } from 'mobx-state-tree';
import { setItem } from '../helpers/localStorage';
import cached from './cached';
import { getTypeURL, getPokemonURL } from '../constants';
import {
	pokemonPlainTypes,
	pokemonsMeta,
	pokemonAvatarMeta,
	state
} from './Types';
import { Pokemon } from './Pokemon';
import { PokemonType } from './PokemonType';
import { FilterStore } from './FilterStore';
import { LoadingStore } from './LoadingStore';
import { Pagination } from './Pagination';

export const PokemonStore = types
	.model('PokemonStore', {
		isLoading: true,
		state,
		loadingStore: LoadingStore,
		types: types.map(PokemonType),
		typesIsFull: false,
		typesState: state,
		typesTotal: types.number,
		filter: FilterStore,
		userLimit: types.maybe(types.number),
		pokemons: types.map(Pokemon),
		pagination: Pagination,
		pokemonsMeta: types.frozen
	})
	.views(self => ({
		get mainStore() {
			return getParent(self);
		},
		get fetchedPokemons() {
			return this.pokemons.values().length;
		},
		get typeUrl() {
			return getTypeURL({ limit: self.typesTotal, offset: 0 });
		},
		get url() {
			return getPokemonURL({ limit: self.limit, offset: self.offset });
		},
		get limit() {
			const { limit } = self.pokemonsMeta;
			console.log(self.pokemonsMeta);
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
				self.updatePokemonTypes(pokemonFullJson);

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
				setItem(`pokemon${apiIndex}`, pokemonShrinkedJson);
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
		function update(json, offset) {
			self.updatePokemons(json.objects, offset);
			self.updateMeta(json.meta);
		}
		const loadPokemons = flow(function*() {
			self.state = 'pending';
			const startIndex = self.offset;
			const endIndex = self.offset + self.limit;
			try {
				const cachedJson = cached(startIndex, endIndex);
				if (cachedJson === false) {
					console.error(startIndex, endIndex);
				}
				if (cachedJson) {
					update(cachedJson, startIndex);
				} else {
					const json = yield self.mainStore.fetch(self.url);
					update(json, json.meta.offset);
				}

				self.state = 'done';
			} catch (err) {
				self.state = 'error';
				console.error('Failed to load pokemons ', err);
			}
		});
		const loadTypes = flow(function*() {
			self.typesState = 'pending';
			try {
				const json = yield self.mainStore.fetch(self.typeUrl);
				console.log(json);
				updateTypes(json);
				self.typesState = 'done';
			} catch (err) {
				self.typesState = 'error';
				console.error('Failed to load types ', err);
			}
		});

		return {
			updateTypes,
			update,
			updateMeta,
			updatePokemonTypes,
			updatePokemons,
			setUserLimit,
			loadTypes,
			loadPokemons
		};
	});
