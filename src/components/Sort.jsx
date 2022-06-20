import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as SortOrderSvg } from '../assets/header/sortOrder.svg';
import {
	setSortingProperty,
	toggleSortingOrder,
} from '../redux/slices/filterSlice.js';

function Sort() {
	const dispatch = useDispatch();

	const sortingProperties = useSelector(
		(state) => state.filter.sortingProperties
	);
	const selectedSortingProperty = useSelector(
		(state) => state.filter.selectedSortingProperty
	);
	const sortingOrder = useSelector((state) => state.filter.sortingOrder);

	const [isPopupActive, setPopusStatus] = React.useState(false);
	const sortRef = React.useRef();

	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.path.includes(sortRef.current)) {
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
				<b
					onClick={() => dispatch(toggleSortingOrder())}
					cursor="pointer">
					Сортировка по:
				</b>
				<span onClick={() => setPopusStatus(!isPopupActive)}>
					{selectedSortingProperty.name}
				</span>
			</div>
			{isPopupActive && (
				<div className="sort__popup">
					<ul>
						{sortingProperties.map((obj, index) => (
							<li
								key={index}
								className={
									obj.sortingProperty ===
									selectedSortingProperty.sortingProperty
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
}

export default Sort;
