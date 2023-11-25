import AppProvider from "@/providers/AppProvider";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<AppProvider>
      <Outlet />
      
		</AppProvider>
	);
};

export default AuthLayout;
