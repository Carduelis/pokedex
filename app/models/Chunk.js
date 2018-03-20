import { types, getParent, flow } from 'mobx-state-tree';
import { state } from './Types';
import cached from './cached';

export const Chunk = types
	.model('Chunk', {
		state,
		offset: types.number
	})
	.views(self => ({
		get loadingStore() {
			return getParent(getParent(self));
		},
		get pokemonStore() {
			return self.loadingStore.pokemonStore;
		},
		get limit() {
			return self.loadingStore.chunkSize;
		}
	}))
	.actions(self => {
		const loadChunkPokemons = flow(function*() {
			self.state = 'pending';
			const startIndex = self.offset;
			const endIndex = self.offset + self.limit;
			try {
				const cachedJson = cached(startIndex, endIndex);
				if (cachedJson) {
					self.pokemonStore.update(cachedJson, startIndex);
				} else {
					const json = yield self.pokemonStore.mainStore.fetch(
						self.pokemonStore.url
					);
					self.pokemonStore.update(json, json.meta.offset);
				}
				self.state = 'done';
			} catch (err) {
				self.state = 'error';
				console.error('Failed to load pokemons ', err);
			}
		});
		function afterCreate() {
			self.loadChunkPokemons();
		}
		return {
			afterCreate,
			loadChunkPokemons
		};
	});
