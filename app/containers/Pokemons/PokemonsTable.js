import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';
import { Table } from '../../components/Table';
import { Message } from '../../components/UI';
import Loader from '../../components/Loader';
import LoadableImg from '../../components/LoadableImg';

@observer
class PokemonsTable extends Component {
	render() {
		const { pokemonStore } = this.props;
		const { state, meta, filter, showPokemon } = pokemonStore;
		const { getPokemonsPerPage } = filter;

		const CellFork = (key, pokemon) =>
			key === 'image'
				? <LoadableImg url={pokemon[key]} />
				: <span>
						{pokemon[key]}
					</span>;
		const HeadCell = item => {
			const Icon = item.icon;
			return (
				<div className="cell-inner">
					{Icon &&
						<span className="cell-icon">
							<Icon />
						</span>}
					<span className="cell-title">
						{item.title}
					</span>
					<span className="cell-short_title">
						{item.short_title}
					</span>
				</div>
			);
		};
		const head = meta.map(item => ({ id: item.api, data: HeadCell(item) }));
		const body = getPokemonsPerPage().map(pokemon => ({
			id: pokemon.id,
			onClick: () => {
				console.log(pokemon.id);
				showPokemon(pokemon.id);
			},
			data: meta.map((item, id) => ({
				data: CellFork(item.api, pokemon),
				id: meta[id].api
			}))
		}));
		console.log(getPokemonsPerPage());
		return (
			<div className="pokemons-table" style={{ minHeight: `${10 * 3}rem` }}>
				{state === 'done' && <Table data={{ body, head }} />}
				{state === 'done' &&
					body.length === 0 &&
					<Message type="info" text="There is no pokemons :(" />}
				{state === 'pending' && <Loader />}
				{state === 'error' && <Message type="error" text="Error to load" />}
			</div>
		);
	}
}

PokemonsTable.propTypes = {
	pokemonStore: PropTypes.object
};
export { PokemonsTable };
