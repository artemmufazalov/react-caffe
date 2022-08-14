// Libs
import React from 'react';
import Link from 'next/link';

// Types
import { TLoadingStatus } from '../../src/redux/slices/products/types';

// Helpers
import { getSelfUrl } from '../../src/heplers/getSelfUrl';

// Redux
import { RootStore, useAppSelector, wrapper } from '../../src/redux/store';
import { fetchSingleProductById } from '../../src/redux/slices/products/asyncActions';
import {
	selectSingleProductLoadingStatus,
	selectSingleProduct,
} from '../../src/redux/slices/products/selectors';
import { setServerUrl } from '../../src/redux/slices/app/appSlice';

const ProductPage: React.FC = () => {
	const product = useAppSelector(selectSingleProduct);

	const productLoadingStatus: TLoadingStatus = useAppSelector(
		selectSingleProductLoadingStatus
	);

	if (productLoadingStatus === 'not_found') {
		return (
			<div className="container">
				<h2>Продукта с предоставленным ID не существует!</h2>
				<br />
				<br />
				<Link href="/">
					<span className="button">На главную</span>
				</Link>
			</div>
		);
	}
	if (productLoadingStatus === 'error') {
		return (
			<div className="container">
				<h2>Ошибка при загрузке данных!</h2>
				<br />
				<br />
				<Link href="/"></Link>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="container">
				<h2>Загрузка...</h2>
			</div>
		);
	}

	return (
		<div className="container">
			<img
				src={product.imageUrl}
				alt={product.title}
				height="200"
				width="200"
			/>
			<h2>{product.title}</h2>
			<h4>От {product.price[0][0]} рублей</h4>
			<br />
			<Link href="/">
				<span className="button">На главную</span>
			</Link>
		</div>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store: RootStore) =>
		async ({ query }): Promise<any> => {
			const { id } = query;
			store.dispatch(setServerUrl(getSelfUrl()));
			await store.dispatch(fetchSingleProductById(String(id)));
		}
);

export default ProductPage;
