import { types, getParent, flow } from 'mobx-state-tree';
import { state, pokemonPlainTypes } from './Types';
import pageCalculation from '../helpers/pageCalculation';

const isInRangeOf = (epsilon, point) => (Math.abs(point) < epsilon);

export const Pagination = types
	.model('Pagination', {
		current: 50
	})
	.views(self => ({
		get pokemonStore() {
			return getParent(self);
		},
		get first() {
			return 1;
		},
		get last() {
			return self.pokemonStore.totalPages;
		},

		get show() {
			const { first, current, last } = self;
			const epsilon = 3;
			pageCalculation({	epsilon, first, current: 1, last });
			pageCalculation({	epsilon, first, current: 2, last });
			pageCalculation({	epsilon, first, current: 3, last });
			pageCalculation({	epsilon, first, current: 4, last });
			pageCalculation({	epsilon, first, current: 5, last });
			pageCalculation({	epsilon, first, current: 25, last });
			pageCalculation({	epsilon, first, current: 46, last });
			pageCalculation({	epsilon, first, current: 47, last });
			pageCalculation({	epsilon, first, current: 48, last });
			pageCalculation({	epsilon, first, current: 49, last });
			pageCalculation({	epsilon, first, current: 50, last });
			return pageCalculation({	epsilon, first, current, last });
		},
		get currentPage() {
			return {
				index: self.current,
				disabled: false,
				active: true
			}
		},
		get firstPage() {
			return {
				index: 1,
				disabled: false,
				active: self.current === 1
			}
		},
		get lastPage() {
			return {
				index: self.last,
				disabled: false,
				active: self.current === self.last
			}
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
				console.warn(`You can not go to page #${page}, cause it does not exist`);
			} else {
				self.current = page;
			}
		}
		function afterCreate() {

		}
		return {
			nextPage,
			prevPage,
			setPage,
			afterCreate
		};
	});
