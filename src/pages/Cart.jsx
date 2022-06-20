import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import { ReactComponent as CartIconSvg } from '../assets/cart/cartIcon.svg';
import { ReactComponent as ClearCartSvg } from '../assets/cart/clearCart.svg';
import { ReactComponent as GoBackArrow } from '../assets/cart/goBackArrow.svg';
import {
	selectCartItems,
	selectCartTotalItemsCost,
	selectCartTotalItemsCount,
	clearCart,
} from '../redux/slices/cartSlice';

function Cart() {
	const dispatch = useDispatch();

	const pizzas = useSelector(selectCartItems);
	const totalCount = useSelector(selectCartTotalItemsCount);
	const totalSum = useSelector(selectCartTotalItemsCost);

	const cartItems = pizzas.map((p) => <CartItem {...p} key={p.cartId} />);

	const onClearCart = () => {
		if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
			dispatch(clearCart());
		}
	};

	if (pizzas.length < 1) {
		return <EmptyCart />;
	}

	return (
		<div className="container container--cart">
			<div className="cart">
				<div className="cart__top">
					<h2 className="content__title">
						<CartIconSvg />
						Корзина
					</h2>
					<div className="cart__clear" onClick={onClearCart}>
						<ClearCartSvg />
						<span>Очистить корзину</span>
					</div>
				</div>
				<div className="content__items">{cartItems}</div>
				<div className="cart__bottom">
					<div className="cart__bottom-details">
						<span>
							Всего пицц: <b>{totalCount} шт.</b>{' '}
						</span>
						<span>
							Сумма заказа: <b>{totalSum} ₽</b>{' '}
						</span>
					</div>
					<div className="cart__bottom-buttons">
						<Link
							to="/"
							className="button button--outline button--add go-back-btn">
							<GoBackArrow />
							<span>Вернуться назад</span>
						</Link>
						<div className="button pay-btn">
							<span>Оплатить сейчас</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
