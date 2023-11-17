/* eslint-disable @typescript-eslint/no-explicit-any */

import { Layout, Menu } from "antd";
import { GiAbstract042 } from "react-icons/gi";
import { FaTrash } from "react-icons/fa";
import { HiMiniFolder } from "react-icons/hi2";
import { IoMdLogOut } from "react-icons/io";
import { IoAnalytics, IoSearch } from "react-icons/io5";
import { TbLockSquareRoundedFilled } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
	const navigate = useNavigate();
	// const params = useSearchParams();
	const location = useLocation();
	console.log("localtion.pathname", location.pathname);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const items: any = [
		{
			key: "/thesis",
			icon: (
				<span className='flex items-center justify-center h-full w-full'>
					<GiAbstract042 size={18} />
				</span>
			),
			label: "All",

			onClick: () => {
				navigate("/thesis");
			},
		},
		{
			key: "/thesis/search",
			icon: (
				<span className='flex items-center justify-center h-full w-full'>
					<IoSearch size={18} />
				</span>
			),
			label: "Search AI",
			onClick: () => {
				navigate("/thesis/search");
			},
		},
		{
			key: "/thesis/manage",
			icon: (
				<span className='flex items-center justify-center h-full w-full'>
					<HiMiniFolder size={18} />
				</span>
			),
			label: "Folder manager",
			onClick: () => {
				navigate("/thesis/manage");
			},
		},
		{
			key: "/thesis/private",
			icon: (
				<span className='flex items-center justify-center h-full w-full'>
					<TbLockSquareRoundedFilled size={30} />
				</span>
			),
			label: "Private",
			onClick: () => {
				navigate("/thesis/private");
			},
		},
		{
			key: "/thesis/trash",
			icon: (
				<span className='flex items-center justify-center h-full w-full'>
					<FaTrash size={14} />
				</span>
			),
			label: "Trash",
			onClick: () => {
				navigate("/thesis/trash");
			},
		},
		{
			key: "/thesis/analysis",
			icon: (
				<span className='flex items-center justify-center h-full w-full'>
					<IoAnalytics size={14} />
				</span>
			),
			label: "Analysis",
			onClick: () => {
				navigate("/thesis/analysis");
			},
		},
	];
	return (
		<Layout.Sider collapsedWidth={60} trigger={null} collapsible collapsed={true}>
			<div className='flex flex-col h-full pb-10 w-full !bg-emerald-400'>
				<div className='h-10 w-full rounded-lg text-white flex items-center justify-center font-extrabold uppercase'>
					The/sis
				</div>

				<Menu
					className='flex-1 flex gap-2 flex-col w-full justify-center items-center !text-white !bg-emerald-400'
					mode='inline'
					defaultSelectedKeys={[
						items.find((item: any) => location.pathname === item.key)?.key || items[0].key,
					]}
					items={items}
				/>

				<Menu
					className='flex gap-2 flex-col w-full justify-center items-center !text-white !bg-emerald-400'
					mode='inline'
					items={[
						{
							key: "0",
							icon: <IoMdLogOut size={18} />,
							label: "Sign out",
						},
					]}
				/>
			</div>
		</Layout.Sider>
	);
};

export default SideBar;
