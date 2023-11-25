import { SideBar, SideOption, SideStorage } from "@/components/organims";
import AppProvider from "@/providers/AppProvider";
import { FloatButton, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FaGuilded } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const LayoutMain = () => {
	return (
		<AppProvider>
			<Layout hasSider className='!h-screen !w-screen'>
				<SideBar />
				<SideOption />
				<Layout className='!flex !w-full !justify-center !flex-row'>
					<Content className='flex-1 w-full overflow-hidden'>
						<Outlet />
					</Content>
					<SideStorage />
					<FloatButton
						shape='square'
						type='primary'
						style={{ right: 24 }}
						icon={<FaGuilded />}
					/>
				</Layout>
			</Layout>
		</AppProvider>
	);
};

export default LayoutMain;
