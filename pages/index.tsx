// Libs
import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useRouter } from 'next/router';

// Components
import {
	Categories,
	Sort,
	ItemSkeleton,
	ItemBlock,
	Pagination,
	ProductTypes,
} from '../src/components';

// Types
import { IItem } from '../src/redux/slices/generalTypes';
import { TLoadingStatus } from '../src/redux/slices/products/types';

// Redux
import { useAppDispatch } from '../src/redux/store';
import {
	setCurrentPage,
	setFilters,
} from '../src/redux/slices/filter/filterSlice';
import { fetchProducts } from '../src/redux/slices/products/asyncActions';
import { selectFilterValues } from '../src/redux/slices/filter/selectors';
import {
	selectProductsLoadingStatus,
	selectItems,
} from '../src/redux/slices/products/selectors';

const Home: React.FC = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	// При первом рендере проверяем строку поиска.
	// Если там есть параметры, то не производим первый рендер пицц, а ждем, пока спарсятся параметры
	const isParsingFirstInteractionUrlQuery = React.useRef(false);

	const isMount = React.useRef(false);

	const {
		activeProductType,
		activeProductCategory,
		activeSortingProperty,
		sortingOrder,
		searchValue,
		currentPage,
	} = useSelector(selectFilterValues);

	const items: IItem[] = useSelector(selectItems);
	const productsLoadingStatus: TLoadingStatus = useSelector(
		selectProductsLoadingStatus
	);

	// @TODO: Scroll to product types
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
					categoryId: activeProductCategory,
					search: searchValue,
					page: currentPage,
					type: activeProductType,
				}),
				currentQuery = qs.stringify(router.query);

			if (currentQuery !== queryString) {
				router.push(`?${queryString}`);
			}
		}
		isMount.current = true;
	}, [
		activeProductType,
		activeSortingProperty,
		sortingOrder,
		searchValue,
		currentPage,
		activeProductCategory,
		router,
	]);

	// Если параметры поиска спарсились или их нет, то производим запрос на бек за пиццами
	React.useEffect(() => {
		if (!isParsingFirstInteractionUrlQuery.current) {
			dispatch(fetchProducts(''));
		}
		isParsingFirstInteractionUrlQuery.current = false;
	}, [
		dispatch,
		activeProductType,
		activeSortingProperty,
		sortingOrder,
		searchValue,
		currentPage,
		activeProductCategory,
	]);

	const [skeletons, setSkeletons] = React.useState<React.ReactNode[]>([]);

	React.useEffect(() => {
		setSkeletons([...new Array(4)].map((_, i) => <ItemSkeleton key={i} />));
	}, [items]);

	const pizzaBlocks = items.map((item) => (
		<ItemBlock {...item} key={item['id']} />
	));

	return (
		<div className="container">
			<div className="content__top">
				<ProductTypes />
				<Sort />
			</div>
			{activeProductType !== 0 && activeProductType !== 5 ? (
				<div className="content__top">
					<Categories />
				</div>
			) : (
				''
			)}
			<h2 className="content__title">Меню</h2>

			{productsLoadingStatus === 'error' && (
				<div className="content__error-info">
					<h2>
						Товаров не нашлось <span>😕</span>
					</h2>
					<br />
					<p>
						К сожалению, по вашему запросу нет товаров. Попробуйте
						изменить параметры поиска!
					</p>
				</div>
			)}
			<div className="content__items">
				{productsLoadingStatus === 'pending' ? skeletons : pizzaBlocks}
			</div>
			{productsLoadingStatus !== 'error' && (
				<Pagination
					onPageChange={onPageChange}
					currentPage={currentPage}
				/>
			)}
		</div>
	);
};

export default Home;
