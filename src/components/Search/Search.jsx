import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { searchFieldCrossSvg, searchIconSvg } from '../../assets';
import { setSearchValue as setGlobalSearchValue } from '../../redux/slices/filterSlice.js';

function Search() {
	const dispatch = useDispatch();

	const searchFieldRef = React.useRef();

	const searchValue = useSelector((state) => state.filter.searchValue);
	const [componentSearchValue, setComponentSearchValue] = React.useState();

	React.useEffect(() => {
		setComponentSearchValue(searchValue);
	}, [searchValue]);

	const onClearSearchField = () => {
		setComponentSearchValue('');
		dispatch(setGlobalSearchValue(''));
		searchFieldRef.current.focus();
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initSearch = React.useCallback(
		debounce((str) => {
			dispatch(setGlobalSearchValue(str));
		}, 500),
		[]
	);

	const onSearchFieldChange = (event) => {
		setComponentSearchValue(event.target.value);
		initSearch(event.target.value);
	};

	return (
		<div className={styles.root}>
			<img src={searchIconSvg} className={styles.icon} alt="Поиск" />
			<input
				className={styles.input}
				type="text"
				placeholder="Поиск пиццы..."
				onChange={onSearchFieldChange}
				value={componentSearchValue}
				ref={searchFieldRef}
			/>
			{componentSearchValue && (
				<img
					src={searchFieldCrossSvg}
					onClick={onClearSearchField}
					className={styles.clearIcon}
					alt="Очистить поиск"
				/>
			)}
		</div>
	);
}

export default Search;
