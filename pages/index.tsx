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

// Helpers
import { getSelfUrl } from '../src/heplers/getSelfUrl';

// Redux
import { useAppDispatch, wrapper, RootStore } from '../src/redux/store';
import {
	dropFilters,
	setCurrentPage,
	setFilters,
} from '../src/redux/slices/filter/filterSlice';
import { fetchProducts } from '../src/redux/slices/products/asyncActions';
import { selectFilterValues } from '../src/redux/slices/filter/selectors';
import {
	selectProductsLoadingStatus,
	selectItems,
} from '../src/redux/slices/products/selectors';
import { setServerUrl } from '../src/redux/slices/app/appSlice';
import {
	setItemsFetched,
	setItemsNeedUpdateStatus,
} from '../src/redux/slices/products/productsSlice';

const Home: React.FC = React.memo(() => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	// При первом рендере проверяем строку поиска.
	// Если там есть параметры, то не производим первый рендер продуктов, а ждем, пока спарсятся параметры
	const isParsingFirstInteractionUrlQuery = React.useRef(false);
	const lastQuery = React.useRef(router.asPath);
	const isMount = React.useRef(false);
	const contentTopRef = React.useRef<HTMLDivElement>(null);

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

	const onPageChange = React.useCallback(
		(page: number) => {
			dispatch(setCurrentPage(page));
			contentTopRef.current?.scrollIntoView();
		},
		[dispatch]
	);

	// Проверяем url-параметры при первом рендере, если они есть, то записываем их в state
	React.useEffect(() => {
		if (window.location.search) {
			const searchQuery = window.location.search.substring(1);
			const params: qs.ParsedQs = qs.parse(searchQuery);
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
				router.push(`?${queryString}`, undefined, { shallow: true });
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

	// Если параметры поиска спарсились или их нет, то производим запрос на бек за продуктами
	React.useEffect(() => {
		if (!isParsingFirstInteractionUrlQuery.current) {
			if (lastQuery.current !== router.asPath) {
				dispatch(fetchProducts(''));
				lastQuery.current = router.asPath;
			}
		}
		isParsingFirstInteractionUrlQuery.current = false;
	}, [
		router,
		dispatch,
		activeSortingProperty,
		sortingOrder,
		searchValue,
		currentPage,
		activeProductType,
		activeProductCategory,
	]);

	const [skeletons, setSkeletons] = React.useState<React.ReactNode[]>([]);

	React.useEffect(() => {
		setSkeletons([...new Array(4)].map((_, i) => <ItemSkeleton key={i} />));
	}, [items]);

	const itemBlocks = items.map((item) => (
		<ItemBlock {...item} key={item['id']} />
	));

	return (
		<div className="container">
			<div className="content__top" ref={contentTopRef}>
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

			{(productsLoadingStatus === 'error' || items.length < 1) && (
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
				{productsLoadingStatus === 'pending' ? skeletons : itemBlocks}
			</div>
			{productsLoadingStatus !== 'error' && (
				<Pagination
					onPageChange={onPageChange}
					currentPage={currentPage}
				/>
			)}
		</div>
	);
});

export const getServerSideProps = wrapper.getServerSideProps(
	(store: RootStore) =>
		async ({ query, req, resolvedUrl, params }): Promise<any> => {
			const requestUrl = req.headers.referer
				?.replace(getSelfUrl(), '')
				.split('?')[0];

			store.dispatch(
				setServerUrl(
					process.env.NEXT_PUBLIC_VERCEL_URL ||
						'http://localhost:3000'
				)
			);
			store.dispatch(setFilters(query));
			await store.dispatch(fetchProducts(''));

			/* Для отмены новой загрузки товаров при переходе на главную страницу с других страниц.
			Так как в этом случае может использоваться ссылка без query параметров, 
			продукты загружаются без фильтров, при этом сами фильтры не сбрасываются, 
			поэтому получаем результат без фильтров, когда они активны, что не правильно  */

			if (requestUrl && requestUrl !== '/') {
				store.dispatch(setItemsNeedUpdateStatus(false));
			} else {
				store.dispatch(setItemsNeedUpdateStatus(true));
			}

			store.dispatch(setItemsFetched(true));
			// Сбрасываем значения в сторе до начальных, чтобы не устанавливать их на клиенте
			store.dispatch(dropFilters());
			store.dispatch(setServerUrl(''));
		}
);

export default Home;
