import { deleteFolderFromDirectory } from "@/apis/folder";
import { addFileMove, removeFileMove } from "@/redux/features/filemove";
import { openMove } from "@/redux/features/onmove";
import { RootState } from "@/redux/store";
import { refactorPath } from "@/utils/common";
import { Checkbox, Dropdown, MenuProps, message } from "antd";
import clsx from "clsx";
import moment from "moment";
import React from "react";
import { AiFillDelete, AiOutlineMore } from "react-icons/ai";
import { BiSolidVideos } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { CgLockUnlock } from "react-icons/cg";
import { FcFolder } from "react-icons/fc";
import { GiMove } from "react-icons/gi";
import { HiDocumentText } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
interface DirectoryRowProps {
	name: string;
	isFolder: boolean;
	disabled: boolean;
	onClick: () => void;
	refresh: () => void;
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
	disabled = false,
	onClick,
	refresh,
}) => {
	const lastFile = name.slice(-3).toLocaleLowerCase() as keyof typeof typeDefine;
	const directory = useSelector((state: RootState) => state.directory.currentPath);
	const fileMoves = useSelector((state: RootState) => state.filemove) as Array<string>;
	const dir = refactorPath(directory, name);
	const dispatch = useDispatch();
	const items: MenuProps["items"] = [
		{
			label: "Move",
			key: "1",
			icon: <GiMove />,
			onClick: () => {
				dispatch(openMove());
				dispatch(addFileMove(dir));
			},
		},
		{
			label: "Private",
			key: "2",
			icon: <CgLockUnlock />,
		},
		{
			label: "Delete",
			key: "3",
			icon: <AiFillDelete />,
			danger: true,
			onClick: async () => {
				deleteFolderFromDirectory({
					delDir: refactorPath(directory, name),
					userId: 1,
				})
					.then(() => {
						message.success("Deleted");
					})
					.finally(() => {
						refresh();
					});
			},
		},
	];

	const menuProps = {
		items,
	};

	return (
		<div
			className={clsx(
				"flex transition-opacity h-[40px] min-h-[40px] w-full bg-neutral-50/30 hover:bg-neutral-100 items-center px-4 rounded-md cursor-pointer gap-2"
			)}
			onClick={onClick}>
			<Checkbox
				checked={fileMoves.includes(dir)}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				onClick={(e: any) => {
					e.stopPropagation();

					if (e.target.checked) {
						dispatch(addFileMove(dir));
					} else {
						dispatch(removeFileMove(dir));
					}
				}}
			/>
			{isFolder && <FcFolder size={20} />}
			{!isFolder && IconByType[typeDefine[lastFile]]}

			<p
				className={clsx("flex-1 text-sm font-medium uppercase hover:text-emerald-600", {
					"opacity-60 cursor-not-allowed": disabled,
				})}>
				{name}
			</p>
			<p>{moment().format("DD/MM/YYYY HH:SS")}</p>
			<div
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<Dropdown menu={menuProps}>
					<div className='p-1 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-200 cursor-pointer relative z-30'>
						<AiOutlineMore size={14} />
					</div>
				</Dropdown>
			</div>
		</div>
	);
};

export default DirectoryRow;
