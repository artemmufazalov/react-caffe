// Libs
import React from 'react';
import ReactPaginate from 'react-paginate';

// Styles
import styles from './Pagination.module.scss';

// Redux
import { useAppSelector } from '../../redux/store';
import { selectPagesCount } from '../../redux/slices/pizza/selectors';

interface PaginationPropsInterface {
	onPageChange: (page: number) => void;
	currentPage: number;
}

const Pagination: React.FC<PaginationPropsInterface> = ({
	onPageChange,
	currentPage,
}) => {
	const pagesCount = useAppSelector(selectPagesCount);

	return (
		<div className={styles.root}>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				previousLabel="<"
				onPageChange={(event) => onPageChange(event.selected + 1)}
				marginPagesDisplayed={1}
				pageRangeDisplayed={3}
				pageCount={pagesCount}
				renderOnZeroPageCount={() => null}
				forcePage={currentPage - 1}
			/>
		</div>
	);
};

export default Pagination;
