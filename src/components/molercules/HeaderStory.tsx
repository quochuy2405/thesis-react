import React from "react";

const HeaderStory = () => {
	return (
		<div className="flex items-center gap-2 justify-center w-full bg-white z-[5] sticky top-0 py-3">
			{[1, 2, 3, 4, 5, 6].map((item) => (
				<div key={item} className="flex h-16 w-16 items-center justify-center">
					<div className="h-full w-full  flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]">
						<div className=" h-full w-full rounded-full bg-white"></div>
					</div>
				</div>
			))}
		</div>
	);
};

export default HeaderStory;
