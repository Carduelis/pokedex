import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cell } from '../Table';

class Row extends Component {
	render() {
		const {
			data,
			keyPropertyName = 'id',
			id,
			groupType,
			onClick = () => {}
		} = this.props;
		return (
			<tr className={`row row-${id}`} onClick={onClick}>
				{data.map(cell =>
					<Cell
						groupType={groupType}
						id={cell[keyPropertyName]}
						key={cell[keyPropertyName]}
					>
						{cell.data}
					</Cell>
				)}
			</tr>
		);
	}
}

Row.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	groupType: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	data: PropTypes.array.isRequired,
	keyPropertyName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export { Row };
