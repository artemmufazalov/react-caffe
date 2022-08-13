// Libs
import React from 'react';

// Styles
import styles from './ItemCard.module.scss';

const ItemSkeleton: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.skeleton}>
				<div className={styles.image}></div>
				<div className={styles.title}></div>
				<div className={styles.selector}></div>
				<div className={styles.bottom}>
					<span className={styles.price}></span>
					<span className={styles.addBtn}></span>
				</div>
			</div>
		</div>
	);
};

export default ItemSkeleton;
