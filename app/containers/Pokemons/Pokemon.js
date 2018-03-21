import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import { Avatar, Stat } from '../Pokemons';
@observer
class Pokemon extends Component {
	render() {
		const { pokemon } = this.props;
		return (
			<div className="pokemon">
				<Avatar pokemon={pokemon} />
				<div className="pokemon-info">
					<div className="pokemon-name">
						{pokemon.name}
					</div>
					<div className="pokemon-types">
						{pokemon.types.map(type => {
							if (type) {
								return (
									<div
										key={type.name}
										className={`type type--${type.name.toLowerCase()}`}
									>
										<span className="type-label">
											{type.name}
										</span>
									</div>
								);
							} else {
								return <span>No types</span>;
							}
						})}
					</div>
					<div className="pokemon-stats">
						<Stat label="Exp" value={pokemon.exp} />
						<Stat label="HP" value={pokemon.hp} />
						<Stat label="Attack" value={pokemon.attack} />
						<Stat label="Defense" value={pokemon.defense} />
						<Stat label="Speed" value={pokemon.speed} />
					</div>
				</div>
			</div>
		);
	}
}

Pokemon.propTypes = {
	pokemon: PropTypes.object
};

export { Pokemon };
