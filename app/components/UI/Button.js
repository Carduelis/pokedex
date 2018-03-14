import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Ink from 'react-ink';
import ClassName from '../../helpers/ClassName';

class Button extends Component {
	render() {
		const className = new ClassName('btn');
		const { props } = this;
		const htmlType = props.submit ? 'submit' : 'button';
		const attrs = props.attrs || {};
		if (props.size) {
			className.push(props.size);
		}
		if (props.filled || props.fill) {
			className.push('fill');
		}
		if (props.bordered) {
			className.push('bordered');
		}
		if (props.loading === true) {
			className.push('loading');
			attrs.disabled = true;
		} else {
			delete attrs.disabled;
		}
		if (props.customClasses) {
			props.customClasses.forEach(classPart => className.push(classPart));
		}
		return (
			<button
				className={className.getClass()}
				onClick={props.handleClick}
				type={htmlType}
				{...attrs}
			>
				<Ink />
				{props.icon &&
					<span className="btn-icon">
						{props.icon}
					</span>}
				{props.loading && <span className="loading-bar" />}
				{props.label &&
					<span className="btn-label">
						{props.label}
					</span>}
				{props.children}
			</button>
		);
	}
}

Button.propTypes = {
	submit: PropTypes.bool,
	customClasses: PropTypes.arrayOf(PropTypes.string),
	size: PropTypes.oneOf(['lg', 'sm']),
	bordered: PropTypes.bool,
	loading: PropTypes.bool,
	label: PropTypes.string,
	icon: PropTypes.element
};

export { Button };
