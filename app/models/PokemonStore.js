import { types, getParent, flow } from 'mobx-state-tree';
import { pokemonPlainTypes } from './Types';
import { Pokemon } from './Pokemon';

export const PokemonStore = types
	.model('PokemonStore', {
		isLoading: true,
		pokemons: types.map(Pokemon)
	})
	.views(self => ({
		get id() {
			return self.pkdx_id;
		},
		get shop() {
			return getParent(self);
		},
		get sortedAvailablePokemons() {
			return sortPokemons(self.pokemons.values());
		}
	}))
	.actions(self => {
		function updatePokemons(json) {
			self.state = 'pending';
			// self.pokemons.values().forEach(pokemon => (pokemon.isAvailable = false));
			json.forEach(pokemonFullJson => {
				const pokemonShrinkedJson = Object.keys(
					pokemonPlainTypes
				).reduce((acc, key) => {
					acc[key] = pokemonFullJson[key];
					return acc;
				}, {});
				self.pokemons.put(pokemonShrinkedJson);
				// self.pokemons.get(pokemonJson.id).isAvailable = true;
			});
		}

		const loadPokemons = flow(function* loadPokemons() {
			try {
				const json = yield self.shop.fetch('/pokemons.json');
				updatePokemons(json.objects);
				self.state = 'done';
			} catch (err) {
				self.state = 'error';
				console.error('Failed to load pokemons ', err);
			}
		});

		return {
			updatePokemons,
			loadPokemons
		};
	});

function sortPokemons(pokemons) {
	return pokemons
		.filter(b => b.isAvailable)
		.sort((a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1));
}
