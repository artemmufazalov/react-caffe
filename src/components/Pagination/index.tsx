// Libs
import React from 'react';
import ReactPaginate from 'react-paginate';

// Styles
import styles from './Pagination.module.scss';

interface PaginationPropsInterface {
	onPageChange: (page: number) => void;
	currentPage: number;
}

const Pagination: React.FC<PaginationPropsInterface> = ({
	onPageChange,
	currentPage,
}) => {
	return (
		<div className={styles.root}>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				previousLabel="<"
				onPageChange={(event) => onPageChange(event.selected + 1)}
				marginPagesDisplayed={1}
				pageRangeDisplayed={3}
				pageCount={3}
				renderOnZeroPageCount={() => null}
				forcePage={currentPage - 1}
			/>
		</div>
	);
};

export default Pagination;
