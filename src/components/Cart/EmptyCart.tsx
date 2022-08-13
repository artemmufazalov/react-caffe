// Libs
import React from 'react';
import Link from 'next/link';

// Styles
import styles from './Cart.module.scss';

const EmptyCart: React.FC = () => {
	return (
		<div>
			<div className={styles.emptyCart}>
				<h2>
					Корзина пустая <span>😕</span>
				</h2>
				<p>
					Вероятней всего, вы еще ничего в нее не добавили.
					<br />
					Для того, чтобы добавить товар, перейдите на главную
					страницу.
				</p>
				<img src="/assets/emptyCart.png" alt="Empty cart" />
				<Link href="/">
					<button
						className={
							'button button--black ' + styles.emptyCart__button
						}>
						<span>Вернуться назад</span>
					</button>
				</Link>
			</div>
		</div>
	);
};

export default EmptyCart;
