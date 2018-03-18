import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Ink from 'react-ink';

class Type extends Component {
	render() {
		const { name, handleClick } = this.props;
		return (
			<div
				className={`type type--${name.toLowerCase()}`}
				onClick={() => handleClick(name.toLowerCase())}
			>
				<span className='type-label'>{name}</span>
				<Ink />
			</div>
		);
	}
}

Type.propTypes = {
	handleClick: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};


export { Type };
