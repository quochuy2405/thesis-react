/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCroppedPhoto } from "@/apis/get_image";
import { Avatar, Tooltip } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface LoadFacesExistedProps {
	hidden: boolean;
	active?: Array<string>;
	onActive: (active: string) => void;
}

const LoadFacesExisted: React.FC<LoadFacesExistedProps> = ({ hidden, active, onActive }) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [faces, setFace] = useState<any>([]);
	useEffect(() => {
		getCroppedPhoto("1")
			.then((res) => {
				const data = res.data;
				if (data) {
					setFace(data);
				}
			})
			.catch(() => {
				setFace([]);
			});
	}, [hidden]);
	return (
		<div
			className={clsx("flex items-center gap-4 flex-wrap h-fit", {
				hidden: !!hidden,
			})}>
			{faces.map((item: any, index: number) => (
				<Tooltip title={item.photoName}>
					<Avatar
						key={item.photoName}
						className={clsx("cursor-pointer", {
							"border-2 border-emerald-400": active?.includes(item.photoName?.replace(".png", "")?.replace(".jpg", "")),
						})}
						onClick={() => onActive(item.photoName?.replace(".png", "")?.replace(".jpg", ""))}
						size={100.4}
						alt={item.photoName}
						// src={"sftp://root@14.225.203.193" + item.photoDirectory}
						src={`https://picsum.photos/id/${index}/200/300`}
					/>
				</Tooltip>
			))}
		</div>
	);
};

export default LoadFacesExisted;
