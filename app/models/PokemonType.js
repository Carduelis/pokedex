import { types } from 'mobx-state-tree';

export const PokemonType = types
	.model('Type', {
		name: types.string,
		resource_uri: types.identifier()
	})
	.views(self => ({
		get id() {
			return self.resource_uri;
		}
	}));
