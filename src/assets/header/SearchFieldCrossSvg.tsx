import React from 'react';

const SearchFieldCrossSvg = (props: any) => (
	<svg
		height="200"
		viewBox="0 0 200 200"
		width="100"
		xmlns="http://www.w3.org/2000/svg"
		{...props}>
		<title>{props.alt}</title>
		<path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
	</svg>
);

export default SearchFieldCrossSvg;
