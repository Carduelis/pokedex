import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '../components/UI';

class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.clearInput = this.clearInput.bind(this);
	}
	onInputChange(event) {
		const { value } = event.target;
		this.setState({ value: value });
		this.applyFilter(value);
	}
	applyFilter(value) {
		const { setFilter } = this.props;
		console.log(`apply to "${value}". String length is ${value.length}`);
		setFilter({ name: value });
	}
	clearInput() {
		this.setState({ value: '' });
		this.applyFilter('');
	}
	render() {
		const { value } = this.state;
		return (
			<div className="search-box">
				<div className="input-box">
					<input
						className="input"
						type="text"
						onChange={this.onInputChange}
						value={value}
						placeholder="Example: Pikachu"
					/>
					<Button label="&times;" handleClick={this.clearInput} />
				</div>
				<Button label="Search" handleClick={this.doFilter} />
			</div>
		);
	}
}

SearchBox.propTypes = {
	setFilter: PropTypes.func,
	clearFilter: PropTypes.func
};

export { SearchBox };
