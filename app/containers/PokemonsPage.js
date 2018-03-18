import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer, inject } from 'mobx-react';
import Header from '../components/Header';
import Content from '../components/Content';
import Page from '../components/Page';
import { PokemonsList, PokemonsTable } from './Pokemons';
import { Button } from '../components/UI';

@inject('store')
@observer
class PokemonsPage extends Component {
	render() {
		const { store } = this.props;
		const { pokemonStore } = store;
		console.log(pokemonStore);
		const btnProps = {
			label: 'Reload',
			handleClick: () => {
				// pokemonStore.setState('pen');
			}
		};

		return (
			<Page>
				<Header />
				<Content>
					<Button {...btnProps} />
					<PokemonsTable pokemonStore={pokemonStore} />
					<PokemonsList pokemonStore={pokemonStore} />
				</Content>
			</Page>
		);
	}
}

PokemonsPage.propTypes = {
	store: PropTypes.object
};

export default PokemonsPage;
