// Libs
import React from 'react';

// Styles
import styles from './TypesAndCategories.module.scss';

// Data
import metaData from '../../data/meta.json';

// Redux
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setProductType } from '../../redux/slices/filter/filterSlice';
import { selectActiveProductType } from '../../redux/slices/filter/selectors';

const ProductTypes: React.FC = React.memo(() => {
	const dispatch = useAppDispatch();

	const activeProductType: number = useAppSelector(selectActiveProductType);

	const productTypesLabels = [
		metaData['universal_category'],
		...metaData['products_types'].map((a) => a[1]),
	];

	return (
		<div>
			<div className={styles.categories}>
				<p>Продукт</p>

				<ul>
					{productTypesLabels.map((pt, index) => (
						<li
							key={index}
							className={
								activeProductType === index ? styles.active : ''
							}
							onClick={() => dispatch(setProductType(index))}>
							{pt}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
});

export default ProductTypes;
