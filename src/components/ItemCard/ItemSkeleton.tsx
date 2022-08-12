// Libs
import React from 'react';
import ContentLoader from 'react-content-loader';

// Styles
import styles from './ItemCard.module.scss';

const ItemSkeleton: React.FC = () => (
	<ContentLoader
		className={styles.skeleton}
		speed={2}
		width={280}
		height={465}
		viewBox="0 0 280 465"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb">
		<circle cx="140" cy="110" r="110" />
		<rect x="0" y="230" rx="10" ry="10" width="280" height="30" />
		<rect x="0" y="272" rx="10" ry="10" width="280" height="88" />
		<rect x="150" y="382" rx="25" ry="25" width="130" height="45" />
		<rect x="0" y="387" rx="10" ry="10" width="110" height="30" />
	</ContentLoader>
);

export default ItemSkeleton;
