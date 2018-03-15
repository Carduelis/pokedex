import { types, getEnv } from 'mobx-state-tree';
import { PokemonStore } from './PokemonStore';

export const MainStore = types
	.model('MainStore', {
		pokemonStore: types.optional(PokemonStore, {
			pokemons: {}
		})
	})
	.views(self => ({
		get fetch() {
			return getEnv(self).fetch;
		},
		get alert() {
			return getEnv(self).alert;
		},
		get isLoading() {
			return self.bookStore.isLoading;
		},
		get books() {
			return self.bookStore.books;
		},
		get sortedAvailableBooks() {
			return self.bookStore.sortedAvailableBooks;
		}
	}))
	.actions(self => ({
		afterCreate() {
			self.pokemonStore.loadPokemons();
		}
	}));
