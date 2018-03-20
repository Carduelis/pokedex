import { types, getParent, flow } from 'mobx-state-tree';
import { state } from './Types';
import cached from './cached';

import { getPokemonURL } from '../constants';

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
		get url() {
			return getPokemonURL({ limit: self.limit, offset: self.offset });
		},
		get limit() {
			return self.loadingStore.chunkSize;
		}
	}))
	.actions(self => {
		const loadChunkPokemons = flow(function*() {
			const { updatePokemons, mainStore } = self.pokemonStore;
			self.state = 'pending';
			const startIndex = self.offset;
			const endIndex = self.offset + self.limit;
			try {
				const cachedJson = cached(startIndex, endIndex);
				if (cachedJson) {
					// we do not need to rewrite meta. it's background process
					updatePokemons(cachedJson.objects, startIndex);
				} else {
					const json = yield mainStore.fetch(self.url);
					// we do not need to rewrite meta. it's background process
					updatePokemons(json.objects, json.meta.offset);
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
