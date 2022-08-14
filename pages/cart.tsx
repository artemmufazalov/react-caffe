// Libs
import React from 'react';

// Components
import { CartComponent, CartItem, EmptyCart } from '../src/components';

// Types
import { ICartItem } from '../src/redux/slices/cart/types';

// Redux
import { useAppDispatch, useAppSelector } from '../src/redux/store';
import { clearCart } from '../src/redux/slices/cart/cartSlice';
import {
	selectCartItems,
	selectCartTotalItemsCost,
	selectCartTotalItemsCount,
} from '../src/redux/slices/cart/selectors';

const Cart: React.FC = () => {
	const dispatch = useAppDispatch();

	const items: ICartItem[] = useAppSelector(selectCartItems);
	const totalCount: number = useAppSelector(selectCartTotalItemsCount);
	const totalSum: number = useAppSelector(selectCartTotalItemsCost);

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
		<CartComponent {...{ cartItems, totalCount, totalSum, onClearCart }} />
	);
};

export default Cart;
