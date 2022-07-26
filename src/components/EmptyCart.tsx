// Libs
import React from 'react';
import Link from 'next/link';

const EmptyCart: React.FC = () => {
	return (
		<div>
			<div className="cart cart--empty">
				<h2>
					Корзина пустая <span>😕</span>
				</h2>
				<p>
					Вероятней всего, вы не заказывали ещё пиццу.
					<br />
					Для того, чтобы заказать пиццу, перейдите на главную
					страницу.
				</p>
				<img src="/assets/emptyCart.png" alt="Empty cart" />
				<Link href="/">
					<span className="button button--black">
						Вернуться назад
					</span>
				</Link>
			</div>
		</div>
	);
};

export default EmptyCart;
