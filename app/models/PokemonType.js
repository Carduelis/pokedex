import { types, getParent, flow } from 'mobx-state-tree';

export const PokemonType = types.model('Type', {
	name: types.string,
	resource_uri: types.identifier()
});
