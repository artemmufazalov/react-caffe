import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as MinusSvg } from '../assets/cart/minus.svg';
import { ReactComponent as PlusSvg } from '../assets/cart/plus.svg';
import { ReactComponent as CrossSvg } from '../assets/cart/cross.svg';
import {
	increasePizzaQuantity,
	decreasePizzaQuantity,
	removePizzaFromCart,
} from '../redux/slices/cartSlice';

function CartItem(props) {
	const {
		doughType,
		sizeIndex,
		sizes,
		cartId,
		title,
		price,
		imageUrl,
		quantity,
	} = props;

	const dispatch = useDispatch();

	const onClickRemove = () => {
		if (
			window.confirm(
				'Вы уверены, что хотите удалить эту пиццу из корзины?'
			)
		) {
			dispatch(removePizzaFromCart(cartId));
		}
	};

	return (
		<div className="cart__item">
			<div className="cart__item-img">
				<img
					className="pizza-block__image"
					src={imageUrl}
					alt="Pizza"
				/>
			</div>
			<div className="cart__item-info">
				<h3>{title}</h3>
				<p>
					{doughType} тесто, {sizes[sizeIndex]} см.
				</p>
			</div>
			<div className="cart__item-count">
				<div
					className="button button--outline button--circle cart__item-count-minus"
					onClick={() => {
						dispatch(decreasePizzaQuantity(cartId));
					}}>
					<MinusSvg />
				</div>
				<b>{quantity}</b>
				<div
					className="button button--outline button--circle cart__item-count-plus"
					onClick={() => {
						dispatch(increasePizzaQuantity(cartId));
					}}>
					<PlusSvg />
				</div>
			</div>
			<div className="cart__item-price">
				<b>{price * quantity} ₽</b>
			</div>
			<div className="cart__item-remove">
				<div
					className="button button--outline button--circle"
					onClick={onClickRemove}>
					<CrossSvg />
				</div>
			</div>
		</div>
	);
}

export default CartItem;
