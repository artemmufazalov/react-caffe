// Libs
import React from 'react';
import ReactPaginate from 'react-paginate';

// Styles
import styles from './Pagination.module.scss';

// Redux
import { useAppSelector } from '../../redux/store';
import { selectPagesCount } from '../../redux/slices/products/selectors';

interface PaginationPropsInterface {
	onPageChange: (page: number) => void;
	currentPage: number;
}

const Pagination: React.FC<PaginationPropsInterface> = ({
	onPageChange,
	currentPage,
}) => {
	const pagesCount = useAppSelector(selectPagesCount);

	if (pagesCount < 2) {
		return <div className={styles.root}></div>;
	}

	return (
		<div className={styles.root}>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				previousLabel="<"
				onPageChange={(event) => onPageChange(event.selected + 1)}
				marginPagesDisplayed={1}
				pageRangeDisplayed={3}
				pageCount={pagesCount || 0}
				renderOnZeroPageCount={() => null}
				forcePage={currentPage - 1}
			/>
		</div>
	);
};

export default Pagination;
