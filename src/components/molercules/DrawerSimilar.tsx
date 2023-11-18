import { getImageSimilar } from "@/apis/get_image";
import { ImageType } from "@/types/image";
import { Button, Col, Drawer, Empty, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { VscLoading } from "react-icons/vsc";
import { ImagePreview } from ".";
interface DrawerSimilarProps {
	onClose: () => void;
	open: boolean;
	photoName: string | undefined;
	onPickNewImage: (data: ImageType) => void;
}
const DrawerSimilar: React.FC<DrawerSimilarProps> = ({
	onClose,
	open,
	photoName,
	onPickNewImage,
}) => {
	const [loading, setLoading] = useState(false);
	const [similar, setSimilar] = useState<Array<ImageType>>([]);
	const handleSimilarImages = async () => {
		if (photoName) {
			setLoading(true);

			await getImageSimilar("1", photoName)
				.then(({ data }) => {
					setSimilar(data);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};
	useEffect(() => {
		setSimilar([]);
	}, [photoName]);
	return (
		<Drawer
			placement='left'
			size={"default"}
			width={"320px"}
			onClose={() => {
				onClose();
			}}
			zIndex={99999}
			mask={false}
			open={open}>
			<div className='flex items-center flex-col gap-4 h-full overflow-y-auto justify-center'>
				{photoName && (
					<Button
						icon={<BiSearch color='#34d399' size={20} />}
						onClick={handleSimilarImages}
						className='!font-medium !h-10 !text-emerald-400 !flex !items-center !justify-center gap-1 !rounded-md'>
						Find more similar images
					</Button>
				)}
				<Row gutter={{ xs: 8 }} className='flex-1 overflow-y-auto'>
					{!loading && !similar?.length && (
						<div className='w-full flex items-center justify-center h-40 overflow-hidden'>
							<Empty />
						</div>
					)}
					{similar.map((item) => (
						<Col className='gutter-row  h-fit' span={24} key={item.photoId}>
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
					<div className='w-full flex items-center justify-center h-36 overflow-hidden'>
						<Spin
							indicator={
								<span className='animate-spin'>
									<VscLoading />
								</span>
							}
						/>
					</div>
				)}
			</div>
		</Drawer>
	);
};

export default DrawerSimilar;
