import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer, inject } from 'mobx-react';
import Header from '../components/Header';
import Content from '../components/Content';
import Page from '../components/Page';
import { SearchBox } from './SearchBox';
import { Pagination } from './Pagination';
import { PokemonsList, PokemonsTable } from './Pokemons';
import { TypesList } from './Types';
import { Button } from '../components/UI';
@inject('store')
@observer
class PokemonsPage extends Component {
	render() {
		const { store } = this.props;
		const { pokemonStore } = store;
		const { clearFilter, setFilter, setUserLimit, filter } = pokemonStore;
		console.log(pokemonStore);
		const btnProps = {
			label: 'Reload',
			handleClick: () => {
				// pokemonStore.setState('pen');
			}
		};
		// <PokemonsList pokemonStore={pokemonStore} />
		const limits = [10, 20, 50, 100];
		const searchWord = filter ? (filter.name ? filter.name : null) : null;
		return (
			<Page>
				<Header />
				<Content>
					<Button {...btnProps} />
					<div className="pokemon-content">
						<div className="pokemon-sidebar">
							<h2>Options</h2>
							<div className="pokemon-limits">
								{limits.map(limit =>
									<Button
										key={limit}
										label={limit}
										active={pokemonStore.limit === limit}
										handleClick={() => setUserLimit(limit)}
									/>
								)}
							</div>
							<h2>
								Filter: <Button label="Clear" handleClick={clearFilter} />
							</h2>
							{searchWord &&
								<p>
									Search by name: &laquo;{searchWord}&raquo;
								</p>}
							<TypesList pokemonStore={pokemonStore} />
						</div>
						<div className="pokemon-inner-content">
							<SearchBox setFilter={setFilter} clearFilter={clearFilter} />
							<Pagination pagination={pokemonStore.pagination} />
							<PokemonsTable pokemonStore={pokemonStore} />
							<Pagination pagination={pokemonStore.pagination} />
						</div>
					</div>
				</Content>
			</Page>
		);
	}
}

PokemonsPage.propTypes = {
	store: PropTypes.object
};

export default PokemonsPage;
