import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import {
	fetchPizzas,
	selectPizzasLoadingStatus,
	selectItems,
} from '../redux/slices/pizzaSlice';

function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// При первом рендере проверяем строку поиска.
	// Если там есть параметры, то не производим первый рендер пицц, а ждем, пока спарсятся параметры
	const isParsingFirstInteractionUrlQuery = React.useRef(false);

	const isMount = React.useRef(false);

	const {
		selectedCategoryIndex,
		selectedSortingProperty,
		sortingOrder,
		searchValue,
		currentPage,
	} = useSelector((state) => state.filter);

	const items = useSelector(selectItems);
	const pizzasLoadingStatus = useSelector(selectPizzasLoadingStatus);

	const onPageChange = (event) => {
		dispatch(setCurrentPage(event.selected + 1));
		window.scrollTo(0, 0);
	};

	// Проверяем url-параметры при первом рендере, если они есть, то записываем их в state
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			dispatch(setFilters(params));
			isParsingFirstInteractionUrlQuery.current = true;
		}
	}, [dispatch]);

	// Добавляет параметры в query string после первого рендера
	React.useEffect(() => {
		if (isMount.current) {
			const queryString = qs.stringify({
				sort: selectedSortingProperty.sortingProperty,
				order: sortingOrder,
				categoryId: selectedCategoryIndex,
				search: searchValue,
				page: currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMount.current = true;
	}, [
		selectedSortingProperty,
		sortingOrder,
		searchValue,
		currentPage,
		selectedCategoryIndex,
		navigate,
	]);

	// Если параметры поиска спарсились или их нет, то производим запрос на бек за пиццами
	React.useEffect(() => {
		if (!isParsingFirstInteractionUrlQuery.current) {
			dispatch(fetchPizzas());
		}
		isParsingFirstInteractionUrlQuery.current = false;
	}, [
		dispatch,
		selectedSortingProperty,
		sortingOrder,
		searchValue,
		currentPage,
		selectedCategoryIndex,
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
						Пиццы не загрузились <icon>😕</icon>
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
}

export default Home;
