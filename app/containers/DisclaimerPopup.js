import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';
import { Button, Popup } from '../components/UI';

@observer
class DisclaimerPopup extends Component {
	render() {
		const { showDisclaimer, closeDisclaimer } = this.props.store;
		return (
			<Popup opened={showDisclaimer} onClose={closeDisclaimer}>
				<div>
					<h2>Pokemons are still&nbsp;arriving :(</h2>
					<p>
						Because the API does not provide filter-features, we could not
						properly search pokemons by name or filter by type until all the
						pokemons will be fetched.
					</p>
					<p>
						If you try to search or filter pokemons now, it will process with
						only fetched pokemons.
					</p>
					<Button
						bordered
						size="lg"
						label="Ok. Got it."
						handleClick={closeDisclaimer}
					/>
				</div>
			</Popup>
		);
	}
}

DisclaimerPopup.propTypes = {
	store: PropTypes.object
};

export { DisclaimerPopup };
