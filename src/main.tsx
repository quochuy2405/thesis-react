import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/auth";
import LayoutMain from "./layouts/main";
import {
	Analysis,
	Error,
	FolderManage,
	GetStated,
	Manage,
	Private,
	SearchAI,
	Sign,
	Social,
	Trash,
} from "./pages";
import "./styles/global.css";
const router = createBrowserRouter([
	{
		path: "",
		element: <AuthLayout />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Sign />,
				errorElement: <Error />,
			},
			{
				path: "/get-started",
				element: <GetStated />,
				errorElement: <Error />,
			},
			{
				path: "/thesis",
				element: <LayoutMain />,
				errorElement: <Error />,
				children: [
					{
						path: "/thesis/analysis",
						element: <Analysis />,
						errorElement: <Error />,
					},
					{
						path: "/thesis/manage",
						element: <Manage />,
						errorElement: <Error />,
					},
					{
						path: "/thesis/manage/:folder_name",
						element: <FolderManage />,
						errorElement: <Error />,
					},
					{
						path: "/thesis",
						element: <Social />,
						errorElement: <Error />,
					},
					{
						path: "/thesis/private",
						element: <Private />,
						errorElement: <Error />,
					},
					{
						path: "/thesis/search",
						element: <SearchAI />,
						// errorElement: <Error />,
					},
					{
						path: "/thesis/social",
						element: <Social />,
						errorElement: <Error />,
					},
					{
						path: "/thesis/trash",
						element: <Trash />,
						errorElement: <Error />,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
