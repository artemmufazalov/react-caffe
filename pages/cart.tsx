// Libs
import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { CartComponent, CartItem, EmptyCart } from '../src/components';

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
		<CartComponent {...{ cartItems, totalCount, totalSum, onClearCart }} />
	);
};

export default Cart;
