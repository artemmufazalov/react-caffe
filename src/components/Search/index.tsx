// Libs
import React from 'react';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

// Styles
import styles from './Search.module.scss';

// Assets
import { SearchFieldCrossSvg, SearchIconSvg } from '../../assets';

// Redux
import { useAppDispatch } from '../../redux/store';
import { setSearchValue as setGlobalSearchValue } from '../../redux/slices/filter/filterSlice';
import { selectSearchValue } from '../../redux/slices/filter/selectors';

const Search: React.FC = () => {
	const dispatch = useAppDispatch();

	const searchFieldRef = React.useRef<HTMLInputElement>(null);

	const searchValue: string = useSelector(selectSearchValue);

	const [componentSearchValue, setComponentSearchValue] =
		React.useState<string>('');

	React.useEffect(() => {
		setComponentSearchValue(searchValue);
	}, [searchValue]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initSearch = React.useCallback(
		debounce((str: string) => {
			dispatch(setGlobalSearchValue(str));
		}, 500),
		[]
	);

	const onClearSearchField = () => {
		setComponentSearchValue('');
		initSearch.cancel();
		dispatch(setGlobalSearchValue(''));
		searchFieldRef.current?.focus();
	};

	const onSearchFieldChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setComponentSearchValue(event.target.value);
		initSearch(event.target.value);
	};

	return (
		<div className={styles.root}>
			<SearchIconSvg className={styles.icon} alt="Поиск" />
			<input
				className={styles.input}
				type="text"
				placeholder="Поиск товара..."
				onChange={onSearchFieldChange}
				value={componentSearchValue}
				ref={searchFieldRef}
			/>
			{componentSearchValue && (
				<SearchFieldCrossSvg
					onClick={onClearSearchField}
					className={styles.clearIcon}
					alt="Очистить поиск"
				/>
			)}
		</div>
	);
};

export default Search;
