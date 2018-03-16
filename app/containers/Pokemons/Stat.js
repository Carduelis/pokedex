import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const convertStringToValidCssString = wildStr => {
	const defaultString = 'default';
	const message = cause => `Fallback to ${defaultString}. Cause: "${cause}"`;
	if (typeof wildStr !== 'string') {
		console.warn(message(`${typeof wildStr} was given`));
		return defaultString;
	}
	try {
		return wildStr
			.replace(/[^\w\s]/gi, '')
			.trim()
			.replace(/\s/g, '-')
			.toLowerCase();
	} catch (e) {
		console.warn(
			message('given string contains unrecognized symbols'),
			wildStr,
			e
		);
		return defaultString;
	}
};

class Stat extends Component {
	render() {
		const { label, value } = this.props;
		const className = `stat stat-${convertStringToValidCssString(label)}`;
		return (
			<div className={className}>
				<span className="stat-label">
					{label}
				</span>
				<span className="stat-value">
					{value}
				</span>
			</div>
		);
	}
}

Stat.propTypes = {
	label: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export { Stat };
