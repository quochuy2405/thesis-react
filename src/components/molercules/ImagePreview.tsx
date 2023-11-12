import type { ImageType } from "@/types/image";
import { getRandomColor } from "@/utils/common";
import { Image, Space, Tag, Watermark } from "antd";
import React, { useMemo } from "react";
import {
	MdOutlineDriveFileMove,
	MdOutlineFavoriteBorder,
	MdPublic,
} from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
interface ImagePreviewProps {
	onClick: (data: ImageType) => void;
	onClose: () => void;
	data: ImageType;
}
const ImagePreview: React.FC<ImagePreviewProps> = ({
	onClick,
	onClose,
	data,
}) => {
	const tags = useMemo(() => {
		return data.tag
			?.split(",")
			.slice(0, 4)
			.map((item) => (
				<Tag
					color={getRandomColor()}
					key={item}
					className="flex items-center gap-1 capitalize">
					{item}
				</Tag>
			));
	}, [data.tag]);
	return (
		<div className='w-full h-fit p-3 flex flex-col hover:bg-neutral-50 rounded-md cursor-pointer relative'>
			<div className='w-full h-fit relative image-preview'>
				<Watermark content='Thesis'>
					<Image
						preview={{
							movable: true,
							onVisibleChange(value) {
								if (!value) onClose();
								else onClick(data);
							},
						}}
						alt=''
						className='!rounded-md !h-[400px] !w-[300px]'
						src={`https://picsum.photos/800/900`}
					/>
				</Watermark>

				<div className='absolute z-10 top-0 shadow-sm p-2 left-0 w-full h-14  nav-image opacity-0 transition-all ease-linear duration-100'>
					<div className='w-full h-full px-1 rounded-full bg-white flex items-center justify-evenly gap-3'>
						<div className='w-8 h-8 rounded-full text-black transition-all ease-linear duration-200 hover:bg-black/80 hover:!text-white flex items-center justify-center'>
							<MdOutlineFavoriteBorder size={18} />
						</div>
						<div className='w-8 h-8 rounded-full text-black transition-all ease-linear duration-200 hover:bg-black/80 hover:!text-white flex items-center justify-center'>
							<MdOutlineDriveFileMove size={20} />
						</div>
						<div className='w-8 h-8 rounded-full text-black transition-all ease-linear duration-200 hover:bg-black/80 hover:!text-white flex items-center justify-center'>
							<MdPublic size={20} />
						</div>
						<div className='w-8 h-8 rounded-full text-black transition-all ease-linear duration-200 hover:bg-black/80 hover:!text-white flex items-center justify-center'>
							<PiShareFat size={20} />
						</div>
					</div>
				</div>
			</div>
			<div className='py-2 flex flex-col gap-2 h-fit'>
				<h2 className='font-semibold text-sm'>{data?.photo_name}</h2>

				<Space size={[0, 8]} wrap>
					{tags}
				</Space>
			</div>
		</div>
	);
};

export default ImagePreview;
