// Libs
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Assets
import { pizzaLogoSvg } from '../assets';
import { ReactComponent as HeaderCartIconSvg } from '../assets/header/headerCartIcon.svg';

// Components
import { Search } from '.';

// Types
import { CartPizzaInterface } from '../redux/slices/cart/types';

// Redux
import {
	selectCartTotalItemsCount,
	selectCartTotalItemsCost,
	selectCartItems,
} from '../redux/slices/cart/selectors';
import { useCache } from '../redux/reduxCustomHooks/useCache';

const Header: React.FC = () => {
	const { pathname } = useLocation();

	const totalCount: number = useSelector(selectCartTotalItemsCount);
	const totalSum: number = useSelector(selectCartTotalItemsCost);
	const cartItems: CartPizzaInterface[] = useSelector(selectCartItems);

	useCache<CartPizzaInterface[]>('cart', cartItems);

	return (
		<div className="header">
			<div className="container">
				<Link to="">
					<div className="header__logo">
						<img width="38" src={pizzaLogoSvg} alt="Pizza logo" />
						<div>
							<h1>React Pizza</h1>
							<p>самая вкусная пицца во вселенной</p>
						</div>
					</div>
				</Link>

				{!pathname.includes('/cart') && <Search />}
				{!pathname.includes('/cart') && (
					<div className="header__cart">
						<Link to="cart" className="button button--cart">
							<span>{totalSum} ₽</span>
							<div className="button__delimiter"></div>
							<HeaderCartIconSvg />
							<span>{totalCount}</span>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
