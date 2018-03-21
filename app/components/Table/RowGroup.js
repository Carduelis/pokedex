import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from '../Table';

class RowGroup extends Component {
	render() {
		const { groupType = 'body', data, keyPropertyName = 'id' } = this.props;
		const GroupTag = `t${groupType}`;
		if (groupType === 'head') {
			return (
				<GroupTag className="group">
					<Row groupType={groupType} data={data} />
				</GroupTag>
			);
		}
		return (
			<GroupTag className="group">
				{data.map(row =>
					<Row
						groupType={groupType}
						onClick={row.onClick}
						id={row[keyPropertyName]}
						key={row[keyPropertyName]}
						data={row.data}
					/>
				)}
			</GroupTag>
		);
	}
}

RowGroup.propTypes = {
	groupType: PropTypes.oneOf(['body', 'head', 'foot']),
	data: PropTypes.array.isRequired,
	keyPropertyName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export { RowGroup };
