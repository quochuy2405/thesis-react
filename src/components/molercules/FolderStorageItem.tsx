import { openMove } from "@/redux/features/onmove";
import { Dropdown, MenuProps } from "antd";
import React from "react";
import { AiFillDelete, AiOutlineMore } from "react-icons/ai";
import { CgLockUnlock } from "react-icons/cg";
import { FcFolder } from "react-icons/fc";
import { GiMove } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
type FolderStorageItemProps = {
	name?: string;
};
const FolderStorageItem: React.FC<FolderStorageItemProps> = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const items: MenuProps["items"] = [
		{
			label: "Move",
			key: "1",
			icon: <GiMove />,
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
		},
	];
	const handleMenuClick: MenuProps["onClick"] = (e) => {
		// message.info("Click on menu item.");
		dispatch(openMove());
		console.log("click", e);
	};
	const menuProps = {
		items,
		onClick: handleMenuClick,
	};

	const openFolder = () => {
		navigate(`/thesis/manage/203926`);
	};

	return (
		<div className='ring-1 ring-gray-400/60 rounded-md flex justify-between w-full p-3 '>
			<div className='flex flex-col gap-2'>
				<div className='flex items-center gap-1 cursor-pointer py-2' onClick={openFolder}>
					<FcFolder size={20} />
					<p className='font-semibold text-xs'>Folder name</p>
				</div>
				<div className='flex items-center justify-between gap-4'>
					<p className='font-semibold text-xs'>245 Files</p>
					<p className='font-normal text-xs'>2.00GB Usage</p>
				</div>
			</div>
			<div
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<Dropdown menu={menuProps}>
					<div className='p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100/50 cursor-pointer'>
						<AiOutlineMore size={20} />
					</div>
				</Dropdown>
			</div>
		</div>
	);
};

export default FolderStorageItem;
