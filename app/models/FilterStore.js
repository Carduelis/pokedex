import { types, getParent } from 'mobx-state-tree';
// import { getItem, setItem } from '../helpers/localStorage';
// import { API_URL } from '../constants';

export const FilterStore = types
	.model('FilterStore', {
		name: types.string,
		userHasSeenDisclaimer: false,
		showDisclaimer: false,
		types: types.array(types.string)
	})
	.views(self => ({
		get pokemonStore() {
			return getParent(self);
		},
		get pokemons() {
			return self.pokemonStore.pokemons;
		},
		get pokemonsMeta() {
			return self.pokemonStore.pokemonsMeta;
		},
		get isFilteredByName() {
			return self.name !== '';
		},
		get isDefault() {
			const { name, types } = self;
			return types.length === 0 && (name === '' || typeof name !== 'string');
		},
		getPokemons() {
			console.log(self.isDefault);
			if (self.isDefault) {
				return defaultOrder(self.pokemons.values());
			}
			if (self.name) {
				return filterByName(self.pokemons.values(), self.name);
			}
			if (self.types) {
				return filterByTypes(self.pokemons.values(), self.types);
			}
		},
		get total() {
			if (self.isDefault) {
				return self.pokemonsMeta.total_count;
			} else {
				return self.getPokemons().length;
			}
		},
		getPokemonsPerPage() {
			const { offset, limit } = self.pokemonStore;
			console.log(`Show ${limit} pokemons starting from ${offset}`);
			return self.getPokemons().splice(offset, limit);
		}
	}))
	.actions(self => {
		function closeDisclaimer() {
			self.showDisclaimer = false;
		}
		function setFilter({ types, name }) {
			if (
				self.userHasSeenDisclaimer === false &&
				self.pokemonStore.loadingStore.state !== 'done'
			) {
				self.userHasSeenDisclaimer = true;
				self.showDisclaimer = true;
			}

			console.log(self.toJSON());
			if (typeof types !== 'undefined') {
				self.types = types;
			}
			if (typeof name !== 'undefined') {
				self.name = name;
			}
			console.log(self.toJSON());
			// need to clear default page
			self.pokemonStore.pagination.setPage(1);
		}
		function clearFilter() {
			self.types = [];
			self.name = '';
		}
		return {
			setFilter,
			closeDisclaimer,
			clearFilter
		};
	});

function defaultOrder(pokemons) {
	return pokemons.reduce((acc, pokemon) => {
		// console.log('-', pokemon.index, pokemon.pkdx_id, pokemon.name);
		acc[pokemon.index] = pokemon;
		return acc;
	}, []);
}

function filterByName(pokemons, name) {
	// TODO:
	// implement fuzzy search
	return pokemons.filter(pokemon =>
		pokemon.name.toLowerCase().match(name.toLowerCase())
	);
}

function filterByTypes(pokemons, types) {
	return pokemons.filter(pokemon =>
		pokemon.types.find(type => types.includes(type.name.toLowerCase()))
	);
}
//
// function sortPokemons(pokemons) {
// 	return pokemons.sort(
// 		(a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1)
// 	);
// }
