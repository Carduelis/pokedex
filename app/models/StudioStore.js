import { types, getParent, flow } from 'mobx-state-tree';
import { uniqId } from '../helpers';

export const Project = types.model('Project', {
	id: types.identifier(),
	name: types.string,
	photo_url: '//picsum.photos/320/240',
	isAvailable: true
});

export const StudioStore = types
	.model('StudioStore', {
		isLoading: true,
		projects: types.map(Project)
	})
	.views(self => ({
		get shop() {
			return getParent(self);
		},
		get sortedProjects() {
			return sortProjects(self.projects.values());
		}
	}))
	.actions(self => {
		function markLoading(loading) {
			self.isLoading = loading;
		}
		function addProject(obj) {

			self.projects.put(Object.assign({
				id: uniqId()
			}, obj));
		}
		function updateBooks(json) {
			self.projects.values().forEach(book => (book.isAvailable = false));
			json.forEach(bookJson => {
				self.projects.put(bookJson);
				self.projects.get(bookJson.id).isAvailable = true;
			});
		}

		const loadBooks = flow(function* loadBooks() {
			try {
				const json = yield self.shop.fetch('/projects.json');
				updateBooks(json);
				markLoading(false);
			} catch (err) {
				console.error('Failed to load projects ', err);
			}
		});

		return {
			updateBooks,
			loadBooks,
			addProject,
			markLoading
		};
	});

function sortProjects(projects) {
	return projects
		.filter(b => b.isAvailable)
		.sort((a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1));
}
