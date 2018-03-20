import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';
import { ChunkList } from '../Loader';

@observer
class LoadingProgress extends Component {
	render() {
		const { total, loadingStore, fetchedPokemons } = this.props.pokemonStore;
		const { restart, state, pending, error } = loadingStore;
		const handleClick = chunk => {
			restart(chunk);
		};
		return (
			<div className="loader-progress">
				<div className="loader-progress-title">
					{state === 'done' && <span>All pokemons loaded.</span>}
					{Boolean(error) &&
						<span>Click on errored to initiate reloading</span>}
					{Boolean(pending) &&
						<span>
							Loading {fetchedPokemons}/{total} pokemons:
						</span>}
				</div>
				<ChunkList loadingStore={loadingStore} handleClick={handleClick} />
			</div>
		);
	}
}

LoadingProgress.propTypes = {
	pokemonStore: PropTypes.object
};

export { LoadingProgress };
