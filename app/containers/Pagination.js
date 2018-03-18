import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';
import { Button } from '../components/UI';
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';
import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';

class Page extends Component {
	render() {
		const { label, active, handleClick, icon } = this.props;
		const className = active ? 'page-item page-item--active' : 'page-item';
		if (label === null) {
			return <div className='page-item page-item--placeholder'>…</div>;
		}
		return (
			<div className={className}>
				<Button
					icon={icon}
					label={label}
					active={active}
					handleClick={handleClick}
				/>
			</div>
		);
	}
}


@observer
class Pagination extends Component {
	render() {
		const { pagination } = this.props;
		const { current, show, setPage } = pagination;

		let nullCounter = 0;
		const key = page => page !== null ? page : `placeholder${nullCounter++}`;
		return (
			<div className="pagination">
				<Page icon={<MdKeyboardArrowLeft/>} handleClick={() => setPage(current-1)} />
				<div className="dynamic-pagination">
					{show.map(page => <Page key={key(page)} label={page} active={page===current} handleClick={() => setPage(page)} />)}
				</div>
				<Page icon={<MdKeyboardArrowRight/>} handleClick={() => setPage(current+1)} />
			</div>
		);
	}
}

Pagination.propTypes = {
	pagination: PropTypes.object
};
export { Pagination };
