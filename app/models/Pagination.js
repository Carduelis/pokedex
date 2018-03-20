import { types, getParent } from 'mobx-state-tree';
import pageCalculation from '../helpers/pageCalculation';

export const Pagination = types
	.model('Pagination', {
		current: 1
	})
	.views(self => ({
		get totalPages() {
			return Math.ceil(self.pokemonStore.total / self.pokemonStore.limit);
		},
		get pokemonStore() {
			return getParent(self);
		},
		get first() {
			return 1;
		},
		get last() {
			return self.totalPages;
		},

		get show() {
			const { first, current, last } = self;
			const epsilon = 3;
			return pageCalculation({ epsilon, first, current, last });
		}
	}))
	.actions(self => {
		function nextPage() {
			self.setPage(self.current + 1);
		}
		function prevPage() {
			self.setPage(self.current - 1);
		}
		function setPage(page) {
			if (page === 0 || page > self.last) {
				console.warn(
					`You can not go to page #${page}, cause it does not exist`
				);
			} else {
				self.current = page;
				if (self.pokemonStore.filter.isDefault) {
					self.pokemonStore.loadPokemons();
				} else {
					console.log(`
						=======================================================
						|  NO LOADING, CAUSE API DOES NOT PROVIDE FILTERING.  |
						|  PRELOAD AND CACHE ALL POKEMONS VIA CHUNK-LOADING.  |
						=======================================================
					`);
				}
			}
		}
		function afterCreate() {}
		return {
			nextPage,
			prevPage,
			setPage,
			afterCreate
		};
	});
