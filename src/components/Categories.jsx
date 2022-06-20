import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCategory } from '../redux/slices/filterSlice.js';

function Categories() {
	const selectedCategoryIndex = useSelector(
		(state) => state.filter.selectedCategoryIndex
	);
	const categories = useSelector((state) => state.filter.categories);
	const dispatch = useDispatch();

	return (
		<div>
			<div className="categories">
				<ul>
					{categories.map((cat, index) => (
						<li
							key={index}
							className={
								selectedCategoryIndex === index ? 'active' : ''
							}
							onClick={() => dispatch(selectCategory(index))}>
							{cat}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Categories;
