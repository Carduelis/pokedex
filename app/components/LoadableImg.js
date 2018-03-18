import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoadableImg extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageState: null,
			timer: setTimeout(() => {
				if (typeof this.state !== 'string') {
					this.setState({ imageState: 'pending' });
				}
			}, 150)
		};
	}
	handleImageLoaded() {
		this.setState({ imageState: 'done' });
		clearTimeout(this.state.timer);
	}
	handleImageErrored() {
		this.setState({ imageState: 'error' });
		clearTimeout(this.state.timer);
	}
	render() {
		const { url } = this.props;
		const { imageState } = this.state;
		return (
			<div className={`img img--${imageState}`}>
				<img
					src={url}
					onLoad={this.handleImageLoaded.bind(this)}
					onError={this.handleImageErrored.bind(this)}
				/>
				<div className="img-spinner" />
			</div>
		);
	}
}

LoadableImg.propTypes = {
	url: PropTypes.string.isRequired
};

export default LoadableImg;
