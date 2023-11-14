"use client";
import { ModalMoveItemToDestination, UploadFileModal } from "@/components/molercules";
import { store } from "@/redux/store";
import "@/styles/global.css";
import { ConfigProvider } from "antd";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

interface AppProviderProps {
	children: ReactElement | ReactNode;
}
const configThemes = {
	token: {
		colorPrimary: "#00b96b",
		borderRadius: 6,
	},
	components: {
		Button: {
			// colorPrimary: "#00b96b",
			algorithm: false, // Enable algorithm
			primaryColor: "#00b96b",
			primaryBg: "#00b96b",
		},
		Input: {
			colorPrimary: "#eb2f96",
			algorithm: false, // Enable algorithm
		},
		Layout: {
			siderBg: "white",
		},
		Tooltip: {
			colorBgSpotlight: "",
			colorText: "rgba(0, 0, 0, 0.88)",
			borderRadius: 4,
		},
	},
};
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<ConfigProvider theme={configThemes}>
			
        <UploadFileModal />
        <ModalMoveItemToDestination/>
					{children}
				
			</ConfigProvider>
		</Provider>
	);
};

export default AppProvider;
