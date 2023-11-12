import moment from "moment";
import React from "react";
import { BiSolidVideos } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { FcFolder } from "react-icons/fc";
import { HiDocumentText } from "react-icons/hi2";
interface DirectoryRowProps {
	name: string;
	onClick: () => void;
	isFolder: boolean;
}
const IconByType: Record<string, React.ReactNode> = {
	img: <BsImage size={20} color='#00DFA2' />,
	doc: <HiDocumentText size={20} color='#0079FF' />,
	video: <BiSolidVideos size={22} color='#E1AA74' />,
};

const typeDefine: Record<string, string> = {
	png: "img",
	jpg: "img",
	jpeg: "img",
	mp4: "video",
	txt: "doc",
};
const DirectoryRow: React.FC<DirectoryRowProps> = ({
	name,
	isFolder,
	onClick,
}) => {
	const lastFile = name.slice(-3).toLocaleLowerCase() as keyof typeof typeDefine;

	return (
		<div
			className='flex transition-opacity h-[34px] min-h-[34px] w-full bg-neutral-50/30 hover:bg-neutral-100 items-center px-4 rounded-md cursor-pointer gap-2 hover:text-emerald-600'
			onClick={onClick}>
			{isFolder && <FcFolder size={20} />}
			{!isFolder && IconByType[typeDefine[lastFile]]}

			<p className='flex-1 text-sm font-medium uppercase'>{name}</p>
			<p>{moment().format("DD/MM/YYYY HH:SS") }</p>
		</div>
	);
};

export default DirectoryRow;
