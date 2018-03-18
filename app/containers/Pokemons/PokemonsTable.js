import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';
import { Table } from '../../components/Table';
import LoadableImg from '../../components/LoadableImg';

// const defaultPokemons = [{ id: 1, name: 'Pica' }, { id: 2, name: 'Bulb' }];

@observer
class PokemonsTable extends Component {
	render() {
		const { pokemonStore } = this.props;
		const { allPokemons, titles } = pokemonStore;

		const CellFork = (key, pokemon) => (
			key === 'image' ? <LoadableImg url={pokemon[key]} /> : <span>{pokemon[key]}</span>
		);
		const HeadCell = title => title;

		const head = titles.map(title => ({ id: title, data: HeadCell(title) }));
		const body = allPokemons.map(pokemon => ({
			id: pokemon.id,

			data: titles.map((key, id) => ({ data: CellFork(key, pokemon), id: titles[id] }))
		}));

		return (
			<div className="pokemons-table">
				<Table data={{ body, head }} />
			</div>
		);
	}
}

PokemonsTable.propTypes = {
	pokemonStore: PropTypes.object
};
export { PokemonsTable };
