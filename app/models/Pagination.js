import { types, getParent, flow } from 'mobx-state-tree';
import { state, pokemonPlainTypes } from './Types';
import { PokemonType } from './PokemonType';

export const Pokemon = types
	.model('Pokemon', {
		isAvailable: true,
		image: types.maybe(types.string),
		imageState: state,
		types: types.maybe(types.array(types.reference(PokemonType))),
		state,
		...pokemonPlainTypes
	})
	.views(self => ({
		get id() {
			return self.pkdx_id;
		}
	}))
	.actions(self => {
		function afterCreate() {
			// self.setImageState('pending');
			// try {
			// 	const spriteURL = self.sprites[0].resource_uri;
			// 	fetch(`https://pokeapi.co${spriteURL}`)
			// 		.then(response => response.json())
			// 		.then(json => {
			// 			console.log(json);
			// 			self.setImageState('done');
			// 			self.setImage(`https://pokeapi.co${json.image}`);
			// 		})
			// 		.catch(err => {
			// 			self.setImageState('error');
			// 			console.error(err);
			// 		});
			// } catch (e) {
			// 	self.setImageState('error');
			// }
		}
		function setImageState(state) {
			self.imageState = state;
		}
		function setImage(url) {
			self.image = url;
		}
		return {
			setImageState,
			setImage,
			afterCreate
		};
	});
