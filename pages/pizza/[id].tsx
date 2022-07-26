// Libs
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Types
import { PizzaInterface } from '../../src/redux/slices/generalTypes';
import { LoadingStatusType } from '../../src/redux/slices/pizza/types';

// Redux
import { useAppDispatch } from '../../src/redux/store';
import { fetchSinglePizzaById } from '../../src/redux/slices/pizza/asyncActions';
import { selectSinglePizzaLoadingStatus } from '../../src/redux/slices/pizza/selectors';

const PizzaPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const { id } = router.query;

	const [pizza, setPizza] = React.useState<PizzaInterface>();

	const pizzaLoadingStatus: LoadingStatusType = useSelector(
		selectSinglePizzaLoadingStatus
	);

	// TODO: Мб вынести в GetProps, учитывая, что это не меняется
	React.useEffect(() => {
		const fetchPizza = async () => {
			const data = await dispatch(fetchSinglePizzaById(id as string));
			setPizza(data.payload as PizzaInterface);
		};
		fetchPizza();
	}, [id, dispatch]);

	if (pizzaLoadingStatus === 'error') {
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

	if (!pizza) {
		return (
			<div className="container">
				<h2>Загрузка...</h2>
			</div>
		);
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt={pizza.title} />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price}</h4>
			<br />
			<Link href="/">
				<span className="button">На главную</span>
			</Link>
		</div>
	);
};

export default PizzaPage;
