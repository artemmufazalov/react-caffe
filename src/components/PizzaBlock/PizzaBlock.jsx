import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as AddPizzaPlus } from '../../assets/pizzaBlock/addPizzaPlus.svg';
import {
	selectDoughTypes,
	selectPizzaQuantityById,
	addPizza,
} from '../../redux/slices/cartSlice';

function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
	const dispatch = useDispatch();
	const typesNames = useSelector(selectDoughTypes);
	const quantity = useSelector(selectPizzaQuantityById(id));

	const [activePizzaSize, setActivePizzaSize] = React.useState(0);
	const [activePizzaType, setActivePizzaType] = React.useState(0);

	const onClickAddPizza = () => {
		const pizzaData = {
			doughIndex: activePizzaType,
			sizeIndex: activePizzaSize,
			sizes,
			id,
			title,
			price,
			imageUrl,
		};

		dispatch(addPizza(pizzaData));
	};

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<Link to={`/pizza/${id}`}>
					<img
						className="pizza-block__image"
						src={imageUrl}
						alt="Pizza"
					/>
					<h4 className="pizza-block__title">{title}</h4>
				</Link>
				<div className="pizza-block__selector">
					<ul>
						{types.map((type, index) => (
							<li
								key={index}
								className={
									index === activePizzaType ? 'active' : ''
								}
								onClick={() => setActivePizzaType(index)}>
								{typesNames[type]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, index) => (
							<li
								key={index}
								className={
									index === activePizzaSize ? 'active' : ''
								}
								onClick={() => setActivePizzaSize(index)}>
								{size} см.
							</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {price} ₽</div>
					<button
						onClick={onClickAddPizza}
						className="button button--outline button--add">
						<AddPizzaPlus />
						<span>Добавить</span>
						{quantity > 0 && <i>{quantity}</i>}
					</button>
				</div>
			</div>
		</div>
	);
}

export default PizzaBlock;
