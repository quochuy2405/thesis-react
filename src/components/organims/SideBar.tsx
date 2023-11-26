/* eslint-disable @typescript-eslint/no-explicit-any */

import { Layout, Menu, Tour, TourProps } from "antd";
import { GiAbstract042 } from "react-icons/gi";
import { FaTrash } from "react-icons/fa";
import { HiMiniFolder } from "react-icons/hi2";
import { IoMdLogOut } from "react-icons/io";
import { IoAnalytics, IoSearch } from "react-icons/io5";
import { TbLockSquareRoundedFilled } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const SideBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const ref1 = useRef<HTMLDivElement>(null);
	const ref2 = useRef<HTMLDivElement>(null);
	const ref3 = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState<boolean>(false);

	const steps: TourProps["steps"] = [
		{
			title: "Upload File",
			description: "Put your files here.",
			target: () => ref1.current!,
			cover: (
				<img
					alt='tour.png'
					src='https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png'
				/>
			),
			mask: {
				style: {
					boxShadow: "inset 0 0 15px #fff",
				},
			},
		},
		{
			title: "Save",
			description: "Save your changes.",
			target: () => ref2.current!,
		},
		{
			title: "Other Actions",
			description: "Click to see other actions.",
			target: () => ref3.current!,
		},
	];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const items: any = [
		{
			key: "/thesis",
			icon: (
				<span ref={ref1} className='flex items-center justify-center h-full w-full'>
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
				<span ref={ref2} className='flex items-center justify-center h-full w-full'>
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
				<div ref={ref3} className='flex items-center justify-center h-full w-full'>
					<HiMiniFolder size={18} />
				</div>
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
				<Tour
					open={open}
					onClose={() => setOpen(false)}
					steps={steps}
					indicatorsRender={(current, total) => (
						<span>
							{current + 1} / {total}
						</span>
					)}
				/>
				<Menu
					className='flex-1 flex gap-2 flex-col w-full justify-center items-center !text-white !bg-emerald-400 !p-0'
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
							icon: (
								<span className='flex items-center justify-center h-full w-full'>
									<IoMdLogOut size={18} />
								</span>
							),
							label: "Sign out",
						},
					]}
				/>
			</div>
		</Layout.Sider>
	);
};

export default SideBar;
