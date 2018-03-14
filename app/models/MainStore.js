import { types, getEnv } from 'mobx-state-tree';
import { BookStore } from './BookStore';
import { TicketStore } from './TicketStore';
import { StudioStore } from './StudioStore';
// import { ViewStore } from './ViewStore';

export const MainStore = types
	.model('MainStore', {
		bookStore: types.optional(BookStore, {
			books: {}
		}),
		studioStore: types.optional(StudioStore, {
			projects: {}
		}),
		ticketStore: types.optional(TicketStore, {
			tickets: [],
			groups: []
		})
		// cart: types.optional(CartStore, {
		// 	entries: []
		// }),
		// view: types.optional(ViewStore, {})
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
			self.bookStore.loadBooks();
		}
	}));
