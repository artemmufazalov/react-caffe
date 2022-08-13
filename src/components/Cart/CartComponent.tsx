// Libs
import React from 'react';
import Link from 'next/link';

// Assets
import { CartIconSvg, ClearCartSvg, GoBackArrowSvg } from '../../assets';

// Styles
import styles from './Cart.module.scss';

interface CartComponentProps {
	cartItems: React.ReactNode[];
	totalCount: number;
	totalSum: number;
	onClearCart: () => void;
}

const CartComponent: React.FC<CartComponentProps> = ({
	cartItems,
	totalCount,
	totalSum,
	onClearCart,
}) => {
	return (
		<div className="container container--cart">
			<div className={styles.cart}>
				<div className={styles.top}>
					<h2 className={styles.title}>
						<CartIconSvg />
						Корзина
					</h2>
					<div className={styles.clear} onClick={onClearCart}>
						<ClearCartSvg />
						<span>Очистить корзину</span>
					</div>
				</div>
				<div className={styles.items}>{cartItems}</div>
				<div className={styles.bottom}>
					<div className={styles.bottom__details}>
						<span>
							Всего продуктов: <b>{totalCount} шт.</b>{' '}
						</span>
						<span>
							Сумма заказа: <b>{totalSum} ₽</b>{' '}
						</span>
					</div>
					<div className={styles.bottom__buttons}>
						<Link href="/">
							<span
								className={
									'button button--outline button--add ' +
									styles.bottom__buttons__goBackBtn
								}>
								<GoBackArrowSvg />
								<span>Вернуться назад</span>
							</span>
						</Link>
						<div
							className={
								'button ' + styles.bottom__buttons__payBtn
							}>
							<span>Оплатить сейчас</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartComponent;
