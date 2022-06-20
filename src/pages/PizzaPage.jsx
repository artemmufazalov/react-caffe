import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
	fetchSinglePizzaById,
	selectSinglePizzaLoadingStatus,
} from '../redux/slices/pizzaSlice';

function PizzaPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [pizza, setPizza] = React.useState();

	const pizzaLoadingStatus = useSelector(selectSinglePizzaLoadingStatus);

	const { id } = useParams();

	React.useEffect(() => {
		const fetchPizza = async () => {
			const data = await dispatch(fetchSinglePizzaById(id));
			setPizza(data.payload);
		};
		fetchPizza();
	}, [id, navigate, dispatch]);

	if (pizzaLoadingStatus === 'error') {
		return (
			<div className="container">
				<h2>Ошибка при загрузке данных!</h2>
				<br />
				<br />
				<Link to="/" className="button">
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
		</div>
	);
}

export default PizzaPage;
