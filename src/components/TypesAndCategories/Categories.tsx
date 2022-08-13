// Libs
import React from 'react';

// Styles
import styles from './TypesAndCategories.module.scss';

// Data
import metaData from '../../data/meta.json';
import { IMeta } from '../../data/dataTypes';

// Redux
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setCategory } from '../../redux/slices/filter/filterSlice';
import {
	selectActiveProductCategory,
	selectActiveProductType,
} from '../../redux/slices/filter/selectors';

const Categories: React.FC = React.memo(() => {
	const dispatch = useAppDispatch();

	const activeProductType: number = useAppSelector(selectActiveProductType);
	const activeCategoryIndex: number = useAppSelector(
		selectActiveProductCategory
	);

	const dataKey =
		metaData['products_types'][activeProductType - 1][0] + '_categories';

	const categories = [
		metaData['universal_category'],
		...(metaData as IMeta)[dataKey],
	];

	return (
		<div>
			<div className={styles.categories}>
				<p>Категория</p>

				<ul>
					{categories.map((cat, index) => (
						<li
							key={index}
							className={
								activeCategoryIndex === index
									? styles.active
									: ''
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
