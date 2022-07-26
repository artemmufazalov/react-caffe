// Libs
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

// Assets
import { PizzaLogoSvg } from '../assets';
import HeaderCartIconSvg from '../assets/cart/CartIconSvg';

// Components
import { Search } from './index';

// Types
import { CartPizzaInterface } from '../redux/slices/cart/types';

// Redux
import {
	selectCartTotalItemsCount,
	selectCartTotalItemsCost,
	selectCartItems,
} from '../redux/slices/cart/selectors';
import { useCache } from '../redux/reduxCustomHooks/useCache';
import { setCartItems } from '../redux/slices/cart/cartSlice';

const Header: React.FC = () => {
	const router = useRouter();
	const pathname = router.pathname;

	const totalCount: number = useSelector(selectCartTotalItemsCount);
	const totalSum: number = useSelector(selectCartTotalItemsCost);
	const cartItems: CartPizzaInterface[] = useSelector(selectCartItems);

	useCache<CartPizzaInterface[]>('cart', cartItems, setCartItems);

	return (
		<div className="header">
			<div className="container">
				<Link href="/">
					<div
						className={clsx('header__logo', {
							wdpe: pathname === '' || pathname === '/',
						})}>
						<PizzaLogoSvg width="38" alt="На главную" />
						<div>
							<h1>React Pizza</h1>
							<p>самая вкусная пицца во вселенной</p>
						</div>
					</div>
				</Link>

				{!pathname.includes('/cart') && <Search />}
				{!pathname.includes('/cart') && (
					<div className="header__cart">
						<Link href="/cart">
							<div className="button button--cart">
								<span>{totalSum} ₽</span>
								<div className="button__delimiter"></div>
								<HeaderCartIconSvg />
								<span>{totalCount}</span>
							</div>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
