import React, { Component } from 'react';

class Content extends Component {
	render() {
		const { children, name } = this.props;
		const customClassName = name ? ` content-${name}` : '';
		const className = `content${customClassName}`;
		return (
			<div className={className}>
				{children}
			</div>
		);
	}
}

export default Content;
