import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Type } from '../Types';
import { observer } from 'mobx-react';

@observer
class TypesList extends Component {
	render() {
		const { pokemonStore } = this.props;
		const handleClick = pokemonStore.getPokemonsByType;
		return (
			<div className={'types-list'}>
				{pokemonStore.types.values().map(type => (
					<Type pokemonStore={pokemonStore} key={type.id} name={type.name} handleClick={handleClick}/>
					)
				)}
			</div>
		);
	}
}

TypesList.propTypes = {
	pokemonStore: PropTypes.object
};


export { TypesList };
