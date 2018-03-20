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
			loadingStore: {
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

			// TODO:
			// recalculate maxsize (8) based on real data
			const { loadingStore } = self.pokemonStore;

			for (let i = 0; i < 3; i++) {
				loadingStore.chunks.push({
					index: i,
					offset: 10 + loadingStore.chunkSize * i
				});
			}
		}
	}));
