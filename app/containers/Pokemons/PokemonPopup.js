import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Pokemon } from '../Pokemons';
import { PropTypes } from 'prop-types';
import { Popup } from '../../components/UI';

@observer
class PokemonPopup extends Component {
	render() {
		const { pokemonToShow, clearPokemon } = this.props.pokemonStore;
		return (
			<Popup opened={Boolean(pokemonToShow)} onClose={clearPokemon}>
				{pokemonToShow &&
					<div className="popup-pokemon">
						<Pokemon pokemon={pokemonToShow} />
					</div>}
			</Popup>
		);
	}
}

PokemonPopup.propTypes = {
	pokemonStore: PropTypes.object
};

export { PokemonPopup };
