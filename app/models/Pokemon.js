import { types, getParent, flow } from 'mobx-state-tree';
import { state, pokemonPlainTypes } from './Types';
import { PokemonType } from './PokemonType';
import { POKEMON_GITHUB_IMAGE_URL } from '../constants';

export const Pokemon = types
	.model('Pokemon', {
		isAvailable: true,
		index: types.number,
		types: types.maybe(types.array(types.reference(PokemonType))),
		state,
		...pokemonPlainTypes
	})
	.views(self => ({
		get id() {
			return self.pkdx_id;
		},
		get image() {
			return `${POKEMON_GITHUB_IMAGE_URL}${self.pkdx_id}.png`;
		}
	}))
	.actions(self => {
		function afterCreate() {
		}
		return {
			afterCreate
		};
	});
