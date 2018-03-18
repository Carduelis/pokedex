import { types, getEnv } from 'mobx-state-tree';
import { PokemonStore } from './PokemonStore';

export const MainStore = types
	.model('MainStore', {
		pokemonStore: types.optional(PokemonStore, {
			pokemons: {},
			types: {},
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
			// const CHUNK_SIZE = 100;
			// const START_OFFSET = 10;
			// for (let i = 0; i < 8; i++) {
			// 	const offset = (CHUNK_SIZE*i + START_OFFSET);
			// 	const limit = CHUNK_SIZE;
			// 	self.pokemonStore.loadPokemons({ offset, limit });
			// }
		}
	}));
