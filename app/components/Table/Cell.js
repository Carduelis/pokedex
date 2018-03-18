import React, { Component } from 'react';
import PropTypes from 'prop-types';

const mapGroupTypeToCellType = groupType => {
	const DEFAULT_CELL_TAG = 'td';
	const map = {
		head: 'th',
		body: DEFAULT_CELL_TAG,
		foot: DEFAULT_CELL_TAG
	};
	return map[groupType] || DEFAULT_CELL_TAG;
};

class Cell extends Component {
	render() {
		const { groupType, children, id } = this.props;
		const CellTag = mapGroupTypeToCellType(groupType);
		return (
			<CellTag className={`cell cell-${id}`}>
				{children}
			</CellTag>
		);
	}
}

Cell.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	groupType: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number])
};

export { Cell };
