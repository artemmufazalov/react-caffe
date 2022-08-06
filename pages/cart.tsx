// Libs
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

// Assets
import { CartIconSvg, ClearCartSvg, GoBackArrowSvg } from '../src/assets';

// Components
import { CartItem, EmptyCart } from '../src/components';

// Types
import { ICartItem } from '../src/redux/slices/cart/types';

// Redux
import { useAppDispatch } from '../src/redux/store';
import { clearCart } from '../src/redux/slices/cart/cartSlice';
import {
	selectCartItems,
	selectCartTotalItemsCost,
	selectCartTotalItemsCount,
} from '../src/redux/slices/cart/selectors';

const Cart: React.FC = () => {
	const dispatch = useAppDispatch();

	const items: ICartItem[] = useSelector(selectCartItems);
	const totalCount: number = useSelector(selectCartTotalItemsCount);
	const totalSum: number = useSelector(selectCartTotalItemsCost);

	const cartItems = items.map((p) => <CartItem {...p} key={p.cartId} />);

	const onClearCart = () => {
		if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
			dispatch(clearCart());
		}
	};

	if (items.length < 1) {
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
							Всего продуктов: <b>{totalCount} шт.</b>{' '}
						</span>
						<span>
							Сумма заказа: <b>{totalSum} ₽</b>{' '}
						</span>
					</div>
					<div className="cart__bottom-buttons">
						<Link href="/">
							<span className="button button--outline button--add go-back-btn">
								<GoBackArrowSvg />
								<span>Вернуться назад</span>
							</span>
						</Link>
						<div className="button pay-btn">
							<span>Оплатить сейчас</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
