'use client'
import { ImageType } from "@/types/image";
import { Button, Col, Drawer, Row, Spin } from "antd";
import React, { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { ImagePreview } from ".";
import { BiSearch } from "react-icons/bi";
interface DrawerSimilarProps {
	onClose: () => void;
	open: boolean;
	IdImage: string | undefined;
	onPickNewImage: (data: ImageType ) => void;
}
const DrawerSimilar: React.FC<DrawerSimilarProps> = ({
	onClose,
	open,
	IdImage,
	onPickNewImage,
}) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<Array<ImageType>>([]);
	const handleSimilarImages = async () => {
		setLoading(false);
		
	};
	return (
		<Drawer
			placement='left'
			size={"default"}
			width={"300px"}
			onClose={onClose}
			zIndex={99999}
			mask={false}
			open={open}>
			<div className='flex items-center flex-col gap-4 h-full overflow-y-auto justify-center'>
				<Row gutter={{ xs: 8 }}>
					{data.map((item) => (
						<Col className='gutter-row  h-fit' span={6} key={item.photo_id}>
							<ImagePreview
								
								data={item}
								onClick={(data) => {
									onPickNewImage(data);
								}}
								onClose={onClose}
							/>
						</Col>
					))}
				</Row>
				{loading && (
					<Spin
						indicator={
							<span className='animate-spin'>
								<VscLoading />
							</span>
						}
					/>
				)}
				{IdImage && (
					<Button
						icon={<BiSearch color='#34d399' size={20} />}
						onClick={handleSimilarImages}
						className='!font-medium !h-10 !text-emerald-400 !flex !items-center !justify-center gap-1 !rounded-md'>
						Find more similar images
					</Button>
				)}
			</div>
		</Drawer>
	);
};

export default DrawerSimilar;
