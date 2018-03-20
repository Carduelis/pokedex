import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';
import { Chunk } from '../Loader';

@observer
class ChunkList extends Component {
	render() {
		const { loadingStore, handleClick } = this.props;
		return (
			<div className="chunk-list">
				{loadingStore.chunks.map((chunk, i) =>
					<Chunk key={i} chunk={chunk} handleClick={handleClick} />
				)}
			</div>
		);
	}
}
ChunkList.propTypes = {
	loadingStore: PropTypes.object,
	handleClick: PropTypes.func
};

export { ChunkList };
