import { types, getParent } from 'mobx-state-tree';
import { Chunk } from './Chunk';

export const LoadingStore = types
	.model('LoadingStore', {
		chunkSize: types.number,
		offset: types.number,
		chunks: types.array(Chunk)
	})
	.views(self => ({
		get pokemonStore() {
			return getParent(self);
		},
		get total() {
			return self.pokemonStore.total;
		},
		get error() {
			return getCount(self.chunks, 'error');
		},
		get done() {
			return getCount(self.chunks, 'done');
		},
		get pending() {
			return getCount(self.chunks, 'pending');
		},
		get state() {
			return self.error ? 'error' : self.pending ? 'pending' : 'done';
		}
	}))
	.actions(self => {
		function afterCreate() {
			console.log(self);
		}

		return {
			afterCreate
		};
	});

function getCount(chunks, state) {
	return chunks.filter(chunk => chunk.state === state).length;
}
