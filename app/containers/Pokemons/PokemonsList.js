import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';
import { Pokemon } from '../Pokemons';

@observer
class PokemonsList extends Component {
	render() {
		const { pokemonStore } = this.props;

		const { allPokemons } = pokemonStore;
		console.log(allPokemons);
		return (
			<div className="pokemons-list">
			{allPokemons.length &&
				<div>
					{pokemonStore.pokemons
						.values()
						.map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon} />)}
				</div>
			}
			</div>
		);
	}
}

PokemonsList.propTypes = {
	pokemonStore: PropTypes.object
};
export { PokemonsList };
