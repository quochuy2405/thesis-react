
import { Layout, Menu } from "antd";
import { BiSolidCategory } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { HiMiniFolder } from "react-icons/hi2";
import { IoMdLogOut } from "react-icons/io";
import { IoAnalytics, IoSearch } from "react-icons/io5";
import { TbLockSquareRoundedFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
	const navigate  = useNavigate();
	// const params = useSearchParams();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const items: any = [
		{
			key: "null",
			icon: <BiSolidCategory size={18} />,
			label: "All",
			onClick: () => {
				navigate ("/");
			},
		},
		{
			key: "search",
			icon: <IoSearch size={18} />,
			label: "Search AI",
			onClick: () => {
				navigate ("/search");
			},
		},
		{
			key: "manage",
			icon: <HiMiniFolder size={18} />,
			label: "Folder manager",
			onClick: () => {
				navigate ("/manage");
			},
		},
		{
			key: "private",
			icon: <TbLockSquareRoundedFilled size={18} />,
			label: "Private",
			onClick: () => {
				navigate ("/private");
			},
		},
		{
			key: "trash",
			icon: <FaTrash size={14} />,
			label: "Trash",
			onClick: () => {
				navigate ("/trash");
			},
		},
		{
			key: "analysis",
			icon: <IoAnalytics size={14} />,
			label: "Analysis",
			onClick: () => {
				navigate ("/analysis");
			},
		},
	];
	return (
		<Layout.Sider
			collapsedWidth={60}
			trigger={null}
			collapsible
			collapsed={true}>
			<div className="flex flex-col h-full pb-10 w-full !bg-emerald-400">
				<div className="h-10 w-full rounded-lg text-white flex items-center justify-center font-extrabold uppercase">
					Thesis
				</div>

				<Menu
					className="flex-1 flex gap-2 flex-col w-full justify-center items-center !text-white !bg-emerald-400"
					mode="inline"
					defaultSelectedKeys={['1'
						// items.find((item: any) => item.key === params.get("tab"))?.key ||
						// 	items[0].key,
					]}
					items={items}
				/>

				<Menu
					className="flex gap-2 flex-col w-full justify-center items-center !text-white !bg-emerald-400"
					mode="inline"
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
