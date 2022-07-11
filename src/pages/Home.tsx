// Libs
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';

// Components
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';

// Types
import { PizzaInterface } from '../redux/slices/generalTypes';
import { LoadingStatusType } from '../redux/slices/pizza/types';

// Redux
import { useAppDispatch } from '../redux/store';
import { setCurrentPage, setFilters } from '../redux/slices/filter/filterSlice';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';
import { selectFilterValues } from '../redux/slices/filter/selectors';
import {
	selectPizzasLoadingStatus,
	selectItems,
} from '../redux/slices/pizza/selectors';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// При первом рендере проверяем строку поиска.
	// Если там есть параметры, то не производим первый рендер пицц, а ждем, пока спарсятся параметры
	const isParsingFirstInteractionUrlQuery = React.useRef(false);

	const isMount = React.useRef(false);

	const {
		activeCategoryIndex,
		activeSortingProperty,
		sortingOrder,
		searchValue,
		currentPage,
	} = useSelector(selectFilterValues);

	const items: PizzaInterface[] = useSelector(selectItems);
	const pizzasLoadingStatus: LoadingStatusType = useSelector(
		selectPizzasLoadingStatus
	);

	const onPageChange = React.useCallback(
		(page: number) => {
			dispatch(setCurrentPage(page));
			window.scrollTo(0, 0);
		},
		[dispatch]
	);

	// Проверяем url-параметры при первом рендере, если они есть, то записываем их в state
	React.useEffect(() => {
		if (window.location.search) {
			const params: qs.ParsedQs = qs.parse(
				window.location.search.substring(1)
			);
			dispatch(setFilters(params));
			isParsingFirstInteractionUrlQuery.current = true;
		}
	}, [dispatch]);

	// Добавляет параметры в query string после первого рендера
	React.useEffect(() => {
		if (isMount.current) {
			const queryString = qs.stringify({
				sort: activeSortingProperty.sortingProperty,
				order: sortingOrder,
				categoryId: activeCategoryIndex,
				search: searchValue,
				page: currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMount.current = true;
	}, [
		activeSortingProperty,
		sortingOrder,
		searchValue,
		currentPage,
		activeCategoryIndex,
		navigate,
	]);

	// Если параметры поиска спарсились или их нет, то производим запрос на бек за пиццами
	React.useEffect(() => {
		if (!isParsingFirstInteractionUrlQuery.current) {
			dispatch(fetchPizzas(''));
		}
		isParsingFirstInteractionUrlQuery.current = false;
	}, [
		dispatch,
		activeSortingProperty,
		sortingOrder,
		searchValue,
		currentPage,
		activeCategoryIndex,
	]);

	const pizzaBlocks = items.map((pizza) => (
		<PizzaBlock {...pizza} key={pizza['id']} />
	));
	const skeletons = [...new Array(4)].map((_, i) => (
		<PizzaSkeleton key={i} />
	));

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{pizzasLoadingStatus === 'error' && (
				<div className="content__error-info">
					<h2>
						Пиццы не загрузились <span>😕</span>
					</h2>
					<br />
					<p>
						К сожалению, пиццы получить не удалось. Попробуйте
						обновить страницу или вернуться позднее.
					</p>
				</div>
			)}
			<div className="content__items">
				{pizzasLoadingStatus === 'pending' ? skeletons : pizzaBlocks}
			</div>
			{pizzasLoadingStatus !== 'error' && (
				<Pagination
					onPageChange={onPageChange}
					currentPage={currentPage}
				/>
			)}
		</div>
	);
};

export default Home;
