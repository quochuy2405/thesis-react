/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFile } from "antd";
import clsx from "clsx";
import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { BiSolidVideos } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi2";
interface FolderStorageItemProps {
	// type: "img" | "doc" | "video";
	file?: UploadFile<any>;
}
const IconByType = {
	img: <BsImage size={20} />,
	doc: <HiDocumentText size={20} />,
	video: <BiSolidVideos size={22} />,
};

const IconColor = {
	img: "text-[#00DFA2]",
	doc: "text-[#0079FF]",
	video: "text-[#E1AA74]",
};
const typeDefine = {
	"image/png": "img",
	"image/jpg": "img",
	"image/jpeg": "img",
	"video/mp4": "video",
	"text/plain": "doc",
};

const FolderStorageItem: React.FC<FolderStorageItemProps> = ({ file }) => {
	const fileType = file?.type as keyof typeof typeDefine;
	return (
		<div className="ring-1 ring-gray-400/60 rounded-md p-3 items-center flex justify-between min-w-[200px] w-full hover:ring-2 hover:ring-emerald-400 cursor-pointer">
			<div className="flex flex-col gap-2">
				<div className="flex items-start gap-1 cursor-pointer py-2">
					<span
						className={clsx({
							[IconColor[typeDefine[fileType] as keyof typeof IconColor]]:
								typeDefine[fileType],
						})}>
						{IconByType[typeDefine[fileType] as keyof typeof IconColor]}
					</span>
					<p className="font-medium max-w-[170px] text-xs leading-4 line-clamp-3 whitespace-pre-line pt-0.5 truncate h-12">
						{file?.name}
					</p>
				</div>
			</div>
			<div className="p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100/50 cursor-pointer">
				<AiOutlineMore size={20} />
			</div>
		</div>
	);
};

export default FolderStorageItem;
