import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Avatar extends Component {
	render() {
		const { pokemon } = this.props;
		return (
			<div
				className={`pokemon-image-wrapper pokemon-image-wrapper--${pokemon.imageState}`}
			>
				<div className="pokemon-image-holder">
					<div
						className="pokemon-image pokemon-image--original"
						style={{ backgroundImage: `url(${pokemon.image})` }}
					/>
					<div
						className="pokemon-image pokemon-image--blurred"
						style={{ backgroundImage: `url(${pokemon.image})` }}
					/>
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
