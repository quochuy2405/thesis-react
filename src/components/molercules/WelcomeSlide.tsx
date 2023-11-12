

import { Button } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";

const WelcomeSlide = () => {
	const [fadeIn, setFadeIn] = useState(true);
	const [script, setScript] = useState(0);
	let time: NodeJS.Timeout | string = "";
	const initScript = [
		<p key={1}>Welcome to Thesis</p>,
		<p key={2}>{"Let's manage folder with something."}</p>,
		<p key={3}>Find item too flash with AI master</p>,

		<Button
			key={4}
			href="/thesis"
			type="primary"
			className="text-emerald-500 bg-white h-40 w-40 rounded-full hover:!bg-white hover:!text-emerald-500 hover:!ring-emerald-500 hover:ring-2 text-lg font-bold mt-6 hover:scale-95 flex items-center justify-center">
			{"Let's go"}
		</Button>,
	];
	useEffect(() => {
		setFadeIn(true);

		new Promise((resolve) => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			time = setTimeout(() => {
				if (script + 1 < initScript.length) {
					setFadeIn(false);
				}
				resolve(1);
			}, 3000);
		}).then(() => {
			time = setTimeout(() => {
				if (script + 1 < initScript.length) {
					setScript((s) => s + 1);
				}
			}, 300);
		});
		return () => {
			time && clearTimeout(time);
		};
	}, [script]);
	return (
		<div className="flex items-center justify-center">
			<h1
				className={clsx("text-5xl font-extrabold text-white drop-shadow-md", {
					"fade-in": fadeIn,
					"fade-out": !fadeIn,
				})}>
				{initScript[script]}
			</h1>
		</div>
	);
};

export default WelcomeSlide;
