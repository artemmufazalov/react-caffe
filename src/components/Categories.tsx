// Libs
import React from 'react';
import { useSelector } from 'react-redux';

// Redux
import { useAppDispatch } from '../redux/store';
import { setCategory } from '../redux/slices/filter/filterSlice';
import {
	selectActiveCategoryIndex,
	selectCategories,
} from '../redux/slices/filter/selectors';

const Categories: React.FC = React.memo(() => {
	const dispatch = useAppDispatch();

	const activeCategoryIndex: number = useSelector(selectActiveCategoryIndex);
	const categories: string[] = useSelector(selectCategories);

	return (
		<div>
			<div className="categories">
				<ul>
					{categories.map((cat, index) => (
						<li
							key={index}
							className={
								activeCategoryIndex === index ? 'active' : ''
							}
							onClick={() => dispatch(setCategory(index))}>
							{cat}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
});

export default Categories;
