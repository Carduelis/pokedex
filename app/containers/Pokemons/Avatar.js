import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Avatar extends Component {
	constructor(props) {
		super(props);
		this.state = { imageStatus: 'loading' };
	}

	handleImageLoaded() {
		this.setState({ imageStatus: 'loaded' });
	}

	handleImageErrored() {
		this.setState({ imageStatus: 'failed to load' });
	}
	render() {
		const { pokemon } = this.props;
		const image =
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
			pokemon.id +
			'.png';
		return (
			<div
				className={`pokemon-image-wrapper pokemon-image-wrapper--${pokemon.imageState}`}
			>
				<div className="pokemon-image-holder">
					<div
						className="pokemon-image pokemon-image--original"
						style={{ backgroundImage: `url(${image})` }}
					/>
					<div
						className="pokemon-image pokemon-image--blurred"
						style={{ backgroundImage: `url(${image})` }}
					>
						<img
							src={image}
							onLoad={this.handleImageLoaded.bind(this)}
							onError={this.handleImageErrored.bind(this)}
						/>
					</div>
				</div>
				{!pokemon.image &&
					<span className="pokemon-image-status">
						Image is {pokemon.imageState}
					</span>}
				<span className="pokemon-height">
					<span>
						{pokemon.height}0&thinsp;cm
					</span>
				</span>
			</div>
		);
	}
}
export { Avatar };
