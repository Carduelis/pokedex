import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Header from '../components/Header';
import Content from '../components/Content';
import Page from '../components/Page';
import { PokemonsList } from './Pokemons';
import { Button } from '../components/UI';

@inject('store')
@observer
class TestPage extends Component {
	render() {
		const { store } = this.props;
		const { ticketStore, bookStore } = store;
		console.log(bookStore.shop);
		console.log(bookStore.sortedAvailableBooks);
		console.log(ticketStore);
		const btnProps = {
			label: 'add',
			handleClick: () => {
				ticketStore.addTicket('kek');
			}
		};
		return (
			<Page>
				<Header />
				<Content>
					<Button {...btnProps} />
					<PokemonsList />
				</Content>
			</Page>
		);
	}
}

export default TestPage;
