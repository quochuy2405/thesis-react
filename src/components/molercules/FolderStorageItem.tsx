import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { FcFolder } from "react-icons/fc";
type FolderStorageItemProps = {
	name?: string;
};
const FolderStorageItem: React.FC<FolderStorageItemProps> = () => {
	return (
		<div className="ring-1 ring-gray-400/60 rounded-md flex justify-between w-full p-3 ">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-1 cursor-pointer py-2">
					<FcFolder size={20} />
					<p className="font-semibold text-xs">Folder name</p>
				</div>
				<div className="flex items-center justify-between gap-4">
					<p className="font-semibold text-xs">245 Files</p>
					<p className="font-normal text-xs">2.00GB Usage</p>
				</div>
			</div>
			<div className="p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100/50 cursor-pointer">
				<AiOutlineMore size={20} />
			</div>
		</div>
	);
};

export default FolderStorageItem;
