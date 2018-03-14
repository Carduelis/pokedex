import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Pokemon } from '../Pokemons';

const defaultPokemons = [{ id: 1, name: 'Pica' }, { id: 2, name: 'Bulb' }];

@observer
class PokemonsList extends Component {
	render() {
		const { pokemons = defaultPokemons } = this;
		return (
			<div className="pokemons-list">
				{pokemons.map(pokemon => (
					<Pokemon key={pokemon.id} pokemon={pokemon} />
				))}
			</div>
		);
	}
}

export { PokemonsList };
