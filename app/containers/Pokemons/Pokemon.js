import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Avatar } from '../Pokemons';

@observer
class Pokemon extends Component {
	render() {
		const { pokemon } = this.props;
		return (
			<div className="pokemon">
				<Avatar pokemon={pokemon} />
				<div className="pokemon-name">
					{pokemon.name}
				</div>
			</div>
		);
	}
}

export { Pokemon };
