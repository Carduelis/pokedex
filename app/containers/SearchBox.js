import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '../components/UI';

class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchWord: ''
		};
		this.handleInput = this.handleInput.bind(this);
		this.doFilter = this.doFilter.bind(this);
	}
	doFilter() {
		const { setFilter, clearFilter } = this.props;
		const { searchWord } = this.state;
		if (searchWord.length > 0) {
			setFilter({ name: searchWord });
		} else {
			clearFilter();
		}
	}
	handleInput(event) {
		const { setFilter, clearFilter } = this.props;
		const { value } = event.target;
		this.setState({ searchWord: value });
		if (value.length > 0) {
			setFilter({ name: value });
		} else {
			clearFilter();
		}
	}
	render() {
		const { searchWord } = this.state;
		return (
			<div className='search-box'>
				<div className='input-box'>
					<input className='input' type='text' onChange={this.handleInput} value={searchWord} autoFocus placeholder='Pikachu' />
				</div>
				<Button label='Search' handleClick={this.doFilter} />
			</div>
		);
	}
}

SearchBox.propTypes = {
	setFilter: PropTypes.func,
	clearFilter: PropTypes.func,
};


export { SearchBox };
