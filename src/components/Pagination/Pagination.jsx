import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

function Pagination({ onPageChange, currentPage }) {
	return (
		<div className={styles.root}>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				previousLabel="<"
				onPageChange={onPageChange}
				marginPagesDisplayed={1}
				pageRangeDisplayed={3}
				pageCount={3}
				renderOnZeroPageCount={null}
				forcePage={currentPage - 1}
			/>
		</div>
	);
}

export default Pagination;
