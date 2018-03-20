import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '../UI';

class Popup extends Component {
	render() {
		const { children } = this.props;
		const closePopup = () => {
			alert('Close popup');
		};
		return (
			<div className="popup">
				<div className="popup-content">
					<Button label="&times;" handleClick={closePopup} />
					<div className="popup-inner-content">
						{children}
					</div>
				</div>
			</div>
		);
	}
}

Popup.propTypes = {
	children: PropTypes.element
};

export { Popup };
