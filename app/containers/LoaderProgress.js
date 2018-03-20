import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';

const Chunk = ({ percent }) => {
	const className =
		percent === 100
			? 'chunk-fill chunk-fill--done'
			: 'chunk-fill chunk-fill--pending';
	return (
		<div className="chunk">
			<div
				className={className}
				style={{ transform: `scaleX(${percent / 100})` }}
			/>
		</div>
	);
};

Chunk.propTypes = {
	percent: PropTypes.number
};

@observer
class LoaderProgress extends Component {
	render() {
		const chunks = [100, 100, 100, 0, 100, 0, 0];
		const total = 768;
		const IS_DONE = true;
		return (
			<div className="loader-progress">
				<div className="loader-progress-title">
					{IS_DONE && 'All pokemons loaded.'}
					{!IS_DONE && `Loading ${total} pokemons:`}
				</div>
				<div className="chunks">
					{chunks.map((percent, i) => <Chunk key={i} percent={percent} />)}
				</div>
			</div>
		);
	}
}

LoaderProgress.propTypes = {};

export { LoaderProgress };
