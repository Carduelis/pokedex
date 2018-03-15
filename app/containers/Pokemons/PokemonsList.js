import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Pokemon } from '../Pokemons';

// const defaultPokemons = [{ id: 1, name: 'Pica' }, { id: 2, name: 'Bulb' }];

@observer
class PokemonsList extends Component {
	render() {
		const { pokemonStore } = this.props;
		return (
			<div className="pokemons-list">
				{pokemonStore.pokemons
					.values()
					.map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon} />)}
			</div>
		);
	}
}

export { PokemonsList };
