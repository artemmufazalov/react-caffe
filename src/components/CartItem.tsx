// Libs
import React from 'react';

// Assets
import { ReactComponent as MinusSvg } from '../assets/cart/minus.svg';
import { ReactComponent as PlusSvg } from '../assets/cart/plus.svg';
import { ReactComponent as CrossSvg } from '../assets/cart/cross.svg';

// Redux
import { useAppDispatch } from '../redux/store';
import { CartPizzaInterface } from '../redux/slices/cart/types';
import {
	increasePizzaQuantity,
	decreasePizzaQuantity,
	removePizzaFromCart,
} from '../redux/slices/cart/cartSlice';

interface CartItemPropsInterface extends CartPizzaInterface {}

const CartItem: React.FC<CartItemPropsInterface> = ({
	cartId,
	title,
	price,
	imageUrl,
	quantity,
	sizes,
	sizeIndex,
	doughType,
}) => {
	const dispatch = useAppDispatch();

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
};

export default CartItem;
