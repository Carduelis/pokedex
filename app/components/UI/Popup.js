import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '../UI';

class Popup extends Component {
	render() {
		const { children, opened } = this.props;
		const className = opened ? 'popup popup--opened' : 'popup';
		return (
			<div className={className}>
				<div className="popup-content">
					<Button label="&times;" handleClick={this.props.onClose} />
					<div className="popup-inner-content">
						{children}
					</div>
				</div>
				<div className="popup-background" onClick={this.props.onClose} />
			</div>
		);
	}
}

Popup.propTypes = {
	opened: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.element
};

export { Popup };
