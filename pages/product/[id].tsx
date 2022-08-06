// Libs
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Types
import { IItem } from '../../src/redux/slices/generalTypes';
import { TLoadingStatus } from '../../src/redux/slices/products/types';

// Redux
import { useAppDispatch } from '../../src/redux/store';
import { fetchSingleProductById } from '../../src/redux/slices/products/asyncActions';
import { selectSingleProductLoadingStatus } from '../../src/redux/slices/products/selectors';

const ProductPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const { id } = router.query;

	const [product, setProduct] = React.useState<IItem>();

	const productLoadingStatus: TLoadingStatus = useSelector(
		selectSingleProductLoadingStatus
	);

	// TODO: Мб вынести в GetProps, учитывая, что это не меняется
	React.useEffect(() => {
		const fetchProduct = async () => {
			const data = await dispatch(fetchSingleProductById(id as string));
			setProduct(data.payload as IItem);
		};
		fetchProduct();
	}, [id, dispatch]);

	if (productLoadingStatus === 'error') {
		return (
			<div className="container">
				<h2>Ошибка при загрузке данных!</h2>
				<br />
				<br />
				<Link href="/" className="button">
					На главную
				</Link>
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
				height="400"
				width="400"
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

export default ProductPage;
