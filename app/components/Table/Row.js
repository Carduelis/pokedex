import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cell } from '../Table';

class Row extends Component {
	render() {
		const { data, keyPropertyName = 'id', id, groupType } = this.props;
		return (
			<tr className={`row row-${id}`}>
				{data.map(cell => <Cell groupType={groupType} id={cell[keyPropertyName]} key={cell[keyPropertyName]}>{cell.data}</Cell> )}
			</tr>
		);
	}
}

Row.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	groupType: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	keyPropertyName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

export { Row };
