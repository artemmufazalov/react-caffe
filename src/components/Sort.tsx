// Libs
import React from 'react';

// Assets
import { SortOrderSvg } from '../assets';

// Types
import { TSortOrder, TSortProperty } from '../redux/slices/filter/types';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
	setSortingProperty,
	toggleSortingOrder,
} from '../redux/slices/filter/filterSlice';
import {
	selectSortingProperties,
	selectActiveSortingProperty,
	selectSortOrder,
} from '../redux/slices/filter/selectors';

const Sort: React.FC = React.memo(() => {
	const dispatch = useAppDispatch();

	const sortingProperties: TSortProperty[] = useAppSelector(
		selectSortingProperties
	);
	const activeSortingProperty: TSortProperty = useAppSelector(
		selectActiveSortingProperty
	);
	const sortingOrder: TSortOrder = useAppSelector(selectSortOrder);

	const [isPopupActive, setPopusStatus] = React.useState<boolean>(false);

	const sortRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const _event = event as MouseEvent & { path: Node[] };

			if (sortRef.current && !_event.path.includes(sortRef.current)) {
				setPopusStatus(false);
			}
		};
		document.body.addEventListener('click', handleClickOutside);
		return () =>
			document.body.removeEventListener('click', handleClickOutside);
	}, []);

	return (
		<div className="sort" ref={sortRef}>
			<div className="sort__label">
				<SortOrderSvg
					transform={
						sortingOrder === 'asc' ? 'rotate(0)' : 'rotate(180)'
					}
					onClick={() => dispatch(toggleSortingOrder())}
				/>
				<b onClick={() => dispatch(toggleSortingOrder())}>
					Сортировка по:
				</b>
				<span onClick={() => setPopusStatus(!isPopupActive)}>
					{activeSortingProperty.name}
				</span>
			</div>
			{isPopupActive && (
				<div className="sort__popup">
					<ul>
						{sortingProperties.map((obj, index: number) => (
							<li
								key={index}
								className={
									obj.sortingProperty ===
									activeSortingProperty.sortingProperty
										? 'active'
										: ''
								}
								onClick={() => {
									dispatch(setSortingProperty(obj));
									setPopusStatus(!isPopupActive);
								}}>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
});

export default Sort;
