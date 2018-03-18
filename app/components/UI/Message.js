import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Message extends Component {
	render() {
		const { type = 'default', text } = this.props;
		return (
			<div className={`message message-${type}`}>
				{text}
			</div>
		);
	}
}

Message.propTypes = {
	type: PropTypes.oneOf(['error', 'success', 'warning', 'info', 'default']),
	text: PropTypes.string.isRequired
};


export { Message };
