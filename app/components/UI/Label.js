import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Label extends Component {
	render() {
		const { type = 'default', label, value } = this.props;
		return (
			<div className={`label label-${type}`}>
				<div className="label-content">
					<span className="label-text">
						{label}
					</span>
					<span className="label-value">
						{value}
					</span>
				</div>
			</div>
		);
	}
}

const numberOrAString = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number
]);
Label.propTypes = {
	label: numberOrAString.isRequired,
	value: numberOrAString.isRequired,
	type: PropTypes.oneOf(['error', 'success', 'warning', 'info', 'default'])
};

export { Label };
