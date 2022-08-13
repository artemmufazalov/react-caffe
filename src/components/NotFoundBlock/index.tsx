// Libs
import React from 'react';
import Link from 'next/link';

// Styles
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
	return (
		<div className={styles.root}>
			<h1>
				<span>😕</span>
				<br />
				Ничего не найдено!
			</h1>
			<p className={styles.desription}>
				К сожалению, данная страница отсутствует на нашем сайте
			</p>

			<Link href="/">
				<span className={'button button--black ' + styles.button}>
					Вернуться назад
				</span>
			</Link>
		</div>
	);
};

export default NotFoundBlock;
