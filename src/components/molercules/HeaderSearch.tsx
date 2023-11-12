import React from "react";
interface HeaderSearchProps {
	title: string;
}
const HeaderSearch: React.FC<HeaderSearchProps> = ({title}) => {
	return (
		<div className='bg-white h-16 p-4 flex items-center justify-between border-b border-gray-100/50'>
			<div>
				<h2 className='font-semibold text-sm capitalize'>{title}</h2>
				<p className='text-xs text-black/50'>All document file in here</p>
			</div>
		</div>
	);
};

export default HeaderSearch;
