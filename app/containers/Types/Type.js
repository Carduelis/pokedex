import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';
import Ink from 'react-ink';

@observer
class Type extends Component {
	render() {
		const { name, active, handleClick } = this.props;
		let className = `type type--${name.toLowerCase()}`;
		active ? (className += ' type--active') : false;
		return (
			<div
				className={className}
				onClick={() => handleClick(name.toLowerCase())}
			>
				<span className="type-label">
					{name}
				</span>
				<Ink />
			</div>
		);
	}
}

Type.propTypes = {
	handleClick: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	active: PropTypes.bool
};

export { Type };
