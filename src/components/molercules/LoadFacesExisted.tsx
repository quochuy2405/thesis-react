/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCroppedPhoto } from "@/apis/get_image";
import { IMAGE_PREFIX_CROP } from "@/constants/index";
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
			{faces.map((item: any) => (
				<Tooltip title={item.photoName}>
					<Avatar
						key={item.photoName}
						className={clsx("cursor-pointer", {
							"border-2 border-emerald-400": active?.includes(item.photoName),
						})}
						onClick={() => onActive(item.photoName)}
						size={100.4}
						alt={item.photoName}
						// src={"sftp://root@14.225.203.193" + item.photoDirectory}
						src={IMAGE_PREFIX_CROP + "1/" + item.photoName}
					/>
				</Tooltip>
			))}
		</div>
	);
};

export default LoadFacesExisted;
