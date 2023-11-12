import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayoutMain from './layouts/main';
import { Analysis, Error, Manage, Private, SearchAI, Social, Trash } from './pages';
import './styles/global.css';
const router = createBrowserRouter([
	{
		path: "",
		element: <LayoutMain />,
		errorElement: <Error />,
		children: [
			{
				path: "/analysis",
				element: <Analysis />,
				errorElement: <Error />,
			},
			{
				path: "/manage",
				element: <Manage />,
				errorElement: <Error />,
			},
			{
				path: "/private",
				element: <Private />,
				errorElement: <Error />,
			},
			{
				path: "/search",
				element: <SearchAI />,
				// errorElement: <Error />,
			},
			{
				path: "/social",
				element: <Social />,
				errorElement: <Error />,
			},
			{
				path: "/trash",
				element: <Trash />,
				errorElement: <Error />,
			},
		
		],
	},
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
