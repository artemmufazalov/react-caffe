// Libs
import React from 'react';

// Assets
import { MinusSvg, PlusSvg, CrossSvg } from '../assets';

// Redux
import { useAppDispatch } from '../redux/store';
import { ICartItem } from '../redux/slices/cart/types';
import {
	increaseItemQuantity,
	decreaseItemQuantity,
	removeItemFromCart,
} from '../redux/slices/cart/cartSlice';

interface CartItemPropsInterface extends ICartItem {}

const CartItem: React.FC<CartItemPropsInterface> = ({
	cartId,
	title,
	imageUrl,
	quantity,
	type,
	size,
	cartPrice,
}) => {
	const dispatch = useAppDispatch();

	const onClickRemove = () => {
		if (
			window.confirm(
				'Вы уверены, что хотите удалить эту пиццу из корзины?'
			)
		) {
			dispatch(removeItemFromCart(cartId));
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
					{type}, {size}
				</p>
			</div>
			<div className="cart__item-count">
				<button
					disabled={quantity < 2}
					className="button button--outline button--circle cart__item-count-minus"
					onClick={() => {
						dispatch(decreaseItemQuantity(cartId));
					}}>
					<MinusSvg />
				</button>
				<b>{quantity}</b>
				<button
					className="button button--outline button--circle cart__item-count-plus"
					onClick={() => {
						dispatch(increaseItemQuantity(cartId));
					}}>
					<PlusSvg />
				</button>
			</div>
			<div className="cart__item-price">
				<b>{cartPrice * quantity} ₽</b>
			</div>
			<div className="cart__item-remove">
				<button
					className="button button--outline button--circle"
					onClick={onClickRemove}>
					<CrossSvg />
				</button>
			</div>
		</div>
	);
};

export default CartItem;
