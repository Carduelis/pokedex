import { types, getEnv } from 'mobx-state-tree';
import { PokemonStore } from './PokemonStore';

export const MainStore = types
	.model('MainStore', {
		pokemonStore: types.optional(PokemonStore, {
			pokemons: {},
			types: {},
			typesTotal: 20,
			filter: {
				types: [],
				name: ''
			},
			loading: {
				chunkSize: 100,
				offset: 10,
				chunks: []
			},
			pokemonsMeta: {
				limit: 10,
				total_count: 10
			},
			pokemonsDefaultOrder: [],
			pagination: {
				currentPage: 1,
				pages: []
			}
		})
	})
	.views(self => ({
		get fetch() {
			return getEnv(self).fetch;
		},
		get alert() {
			return getEnv(self).alert;
		}
	}))
	.actions(self => ({
		afterCreate() {
			self.pokemonStore.loadPokemons();
			self.pokemonStore.loadTypes();

			// self.pokemonStore.loadPokemons({ chunk: {offset: 100, limit: 1 }});

			// for (let i = 0; i < 8; i++) {
			// 	const offset = (CHUNK_SIZE*i + START_OFFSET);
			// 	const limit = CHUNK_SIZE;
			// }
		}
	}));
