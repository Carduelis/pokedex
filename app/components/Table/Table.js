import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RowGroup } from '../Table';

class Table extends Component {
	render() {
		const { data } = this.props;
		const IS_SIMPLE_TABLE = Array.isArray(data);
		if (IS_SIMPLE_TABLE) {
			return (<table className='table'><RowGroup data={data}/></table>);
		}
		return (
			<table className='table'>
				{data.head && <RowGroup data={data.head} groupType='head' />}
				{data.body && <RowGroup data={data.body}/>}
				{data.foot && <RowGroup data={data.foot} groupType='foot' />}
			</table>
		);
	}
}

Table.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.shape({
			head: PropTypes.array,
			body: PropTypes.array,
			foot: PropTypes.array
		})
	])
};

export { Table };
