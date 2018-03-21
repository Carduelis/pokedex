import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdArrowBack from 'react-icons/lib/md/arrow-back';

class Header extends Component {
	render() {
		return (
			<div className="header fixed">
				<a className="header-back" href="#/">
					<MdArrowBack />
				</a>
				<div className="header-title">
					{this.props.title}
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	title: PropTypes.string
};

export default Header;
