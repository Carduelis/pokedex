import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Ink from 'react-ink';
import { Button } from '../components/UI';

class SearchBox extends Component {
	render() {
		const { searchWord } = this.props;
		return (
			<div className='search-box'>
				<div className='input-box'>
					<input className='input' type='text' value={searchWord} autoFocus placeholder='Pikachu' />
				</div>
				<Button label='Search' />
			</div>
		);
	}
}

SearchBox.propTypes = {
	searchWord: PropTypes.string
};


export { SearchBox };
