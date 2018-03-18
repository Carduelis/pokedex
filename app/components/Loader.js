import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loader extends Component {
	render() {
		const { fixed } = this.props;
		const className = fixed ? 'preloader preloader--fixed' : 'preloader';
		return (
			<div className={className}>
				<div className="preloader-spin" />
			</div>
		);
	}
}

Loader.propTypes = {
	fixed: PropTypes.bool
};

export default Loader;
