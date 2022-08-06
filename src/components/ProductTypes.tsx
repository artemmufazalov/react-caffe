// Libs
import React from 'react';

// Data
import metaData from '../data/meta.json';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setProductType } from '../redux/slices/filter/filterSlice';
import { selectActiveProductType } from '../redux/slices/filter/selectors';

// @TODO: set autoscrolling to Types on category or type change (not to top)
const ProductTypes: React.FC = React.memo(() => {
	const dispatch = useAppDispatch();

	const activeProductType: number = useAppSelector(selectActiveProductType);

	const productTypesLabels = [
		metaData['universal_category'],
		...metaData['products_types'].map((a) => a[1]),
	];

	return (
		<div>
			<div className="categories">
				<ul>
					{productTypesLabels.map((pt, index) => (
						<li
							key={index}
							className={
								activeProductType === index ? 'active' : ''
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
