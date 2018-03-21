import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer, inject } from 'mobx-react';
import Header from '../components/Header';
import Content from '../components/Content';
import Page from '../components/Page';
import { SearchBox } from './SearchBox';
import { Pagination } from './Pagination';
import { PokemonsTable } from './Pokemons';
import { TypesList } from './Types';
import { LoadingProgress } from './Loader';
import { DisclaimerPopup } from './DisclaimerPopup';
import { Button } from '../components/UI';

@inject('store')
@observer
class PokemonsPage extends Component {
	render() {
		const { store } = this.props;
		const { pokemonStore } = store;
		const { setUserLimit, filter, typesState } = pokemonStore;
		const { clearFilter, setFilter, isFilteredByName } = filter;
		console.log(pokemonStore);
		const limits = [10, 20, 50, 100];
		return (
			<Page>
				<Header />
				<Content>
					<div className="pokemon-bar">
						<span onClick={() => localStorage.clear()}>Clear cache</span>
						<LoadingProgress pokemonStore={pokemonStore} />
					</div>
					<div className="pokemon-content">
						<div className="pokemon-sidebar">
							<h2>Per page</h2>
							<div className="pokemon-limits">
								{limits.map(limit => (
									<Button
										key={limit}
										label={limit}
										active={pokemonStore.limit === limit}
										handleClick={() => setUserLimit(limit)}
									/>
								))}
							</div>
							<h2 className="title-filter">
								Filter: <Button label="Clear" handleClick={clearFilter} />
								{typesState !== 'done' && (
									<div className="filter-loading">
										<div className="chunk">
											<div className={`chunk-fill chunk-fill--${typesState}`} />
										</div>
									</div>
								)}
							</h2>

							{isFilteredByName && (
								<p>
									Searched by name: <span>&laquo;{filter.name}&raquo;</span>
								</p>
							)}
							<TypesList pokemonStore={pokemonStore} />
						</div>
						<div className="pokemon-inner-content">
							<div className="pokemon-inner-bar">
								<h2>Search</h2>
								<SearchBox setFilter={setFilter} />
							</div>
							<Pagination pagination={pokemonStore.pagination} />
							<PokemonsTable pokemonStore={pokemonStore} />
							<Pagination pagination={pokemonStore.pagination} />
						</div>
					</div>
				</Content>
				<DisclaimerPopup />
			</Page>
		);
	}
}

PokemonsPage.propTypes = {
	store: PropTypes.object
};

export default PokemonsPage;
