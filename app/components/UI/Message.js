import React, { Component } from 'react';

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

export { Message };
