import { GuideButton } from "@/components/atoms";
import { SideBar, SideOption, SideStorage } from "@/components/organims";
import AppProvider from "@/providers/AppProvider";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
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
					<GuideButton />
				</Layout>
			</Layout>
		</AppProvider>
	);
};

export default LayoutMain;
