// Libs
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Types
import { PizzaInterface } from '../redux/slices/generalTypes';
import { LoadingStatusType } from '../redux/slices/pizza/types';

// Redux
import { useAppDispatch } from '../redux/store';
import { fetchSinglePizzaById } from '../redux/slices/pizza/asyncActions';
import { selectSinglePizzaLoadingStatus } from '../redux/slices/pizza/selectors';

const PizzaPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [pizza, setPizza] = React.useState<PizzaInterface>();

	const pizzaLoadingStatus: LoadingStatusType = useSelector(
		selectSinglePizzaLoadingStatus
	);

	const { id } = useParams();

	React.useEffect(() => {
		const fetchPizza = async () => {
			const data = await dispatch(fetchSinglePizzaById(id || ''));
			setPizza(data.payload as PizzaInterface);
		};
		fetchPizza();
	}, [id, navigate, dispatch]);

	if (pizzaLoadingStatus === 'error') {
		return (
			<div className="container">
				<h2>Ошибка при загрузке данных!</h2>
				<br />
				<br />
				<Link to="../" className="button">
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
			<Link to="../" className="button">
				На главную
			</Link>
		</div>
	);
};

export default PizzaPage;
