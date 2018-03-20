import { types, getParent, flow } from 'mobx-state-tree';
// import { getItem, setItem } from '../helpers/localStorage';
// import { API_URL } from '../constants';

export const FilterStore = types
	.model('FilterStore', {
		name: types.string,
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
		get isDefault() {
			const { name, types } = self;
			return types.length === 0 && (name === '' || typeof name !== 'string');
		},
		getPokemons() {
			console.log(self.isDefault);
			if (self.isDefault) {
				return defaultOrder(self.pokemons.values());
			}
			const { name, types } = self.filter;
			if (name) {
				return filterByName(self.pokemons.values(), name);
			}
			if (types) {
				return filterByTypes(self.pokemons.values(), types);
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
		function setFilter(filter) {
			console.log(JSON.stringify(self.filter));
			self.filter = { ...self.filter, ...filter };
			console.log(JSON.stringify(self.filter));
			// need to clear default page
			self.pagination.setPage(1);
		}
		function clearFilter() {
			self.filter = {
				types: [],
				name: ''
			};
		}
		return {
			setFilter,
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

function sortPokemons(pokemons) {
	return pokemons.sort(
		(a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1)
	);
}
