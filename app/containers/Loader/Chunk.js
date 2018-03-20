import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';

@observer
class Chunk extends Component {
	render() {
		const { chunk, handleClick } = this.props;
		const className = `chunk-fill chunk-fill--${chunk.state}`;
		return (
			<div className="chunk" onClick={() => handleClick(chunk)}>
				<div className={className} />
			</div>
		);
	}
}
Chunk.propTypes = {
	chunk: PropTypes.object,
	handleClick: PropTypes.func
};

export { Chunk };
