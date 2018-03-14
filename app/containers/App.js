import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import PokemonsPage from './PokemonsPage';
import NotFoundPage from './NotFoundPage';

class App extends Component {
	componentWillMount() {}
	onSetSidebarOpen() {}
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={LoginPage} />
					<Route path="/pokemons" component={PokemonsPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</Router>
		);
	}
}

export default App;
