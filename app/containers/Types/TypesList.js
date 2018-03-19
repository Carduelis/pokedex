import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Type } from '../Types';
import { observer } from 'mobx-react';

@observer
class TypesList extends Component {
	constructor(props) {
		super(props);
		this.state = props.pokemonStore.filter;
	}
	render() {
		const { pokemonStore } = this.props;
		const { filter, setFilter } = pokemonStore;
		const types = filter.types;
		const handleClick = name => {
			console.log(name);
			console.log(types);
			const IS_TYPE_EXIST = types.includes(name);
			if (IS_TYPE_EXIST) {
				setFilter({ types: types.filter(type => type !== name) });
			} else {
				setFilter({ types: [...types, name] });
			}
			// const typesToSet = IS_TYPE_EXIST
			// 	? types.filter(type => type !== name)
			// 	: types.push(name);
			// console.log(typesToSet);
			// setFilter({ types: typesToSet });
		};
		return (
			<div className={'types-list'}>
				{pokemonStore.types
					.values()
					.map(type =>
						<Type
							pokemonStore={pokemonStore}
							key={type.id}
							name={type.name}
							active={types.includes(type.name.toLowerCase())}
							handleClick={handleClick}
						/>
					)}
			</div>
		);
	}
}

TypesList.propTypes = {
	pokemonStore: PropTypes.object
};

export { TypesList };
