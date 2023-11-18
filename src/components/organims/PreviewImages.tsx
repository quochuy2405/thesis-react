import { getImageDetails } from "@/apis/get_image";
import { ImageType } from "@/types/image";
import { getRandomColor } from "@/utils/common";
import { Button, Col, Divider, Drawer, Empty, Pagination, QRCode, Row, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { DrawerSimilar, ImagePreview } from "../molercules";

interface DescriptionItemProps {
	title: string;
	content: React.ReactNode;
}

interface PreviewImagesProps {
	data: Array<ImageType>;
	isSimilar: boolean;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
	<div className='flex flex-col gap mt-2'>
		<p className='font-semibold text-xs'>{title}:</p>
		<p className='text-xs'> {content}</p>
	</div>
);

const PreviewImages: React.FC<PreviewImagesProps> = ({ data, isSimilar }) => {
	const [activeImage, setActiveImage] = useState<ImageType>();
	const [detailsImage, setDetailsImage] = useState<ImageType>();
	const [open, setOpen] = useState(false);
	const showLargeDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (activeImage) {
			getImageDetails("1", activeImage?.photoName)
				.then(({ data }) => {
					setDetailsImage(data);
				})
				.catch((e) => console.log("e", e));
		}
	}, [activeImage]);
	return (
		<div className='flex flex-1 justify-center w-full '>
			<div className='flex flex-col w-full'>
				<Row gutter={{ xs: 8, sm: 10, md: 10, lg: 10 }} wrap>
					{!data.length && (
						<div className='h-full w-full flex items-center justify-center'>
							<Empty />
						</div>
					)}
					{data?.map((item) => (
						<Col className='gutter-row min-w-[270px] m-auto' span={6} key={JSON.stringify(item)}>
							<ImagePreview
								data={item}
								onClick={(data) => {
									setActiveImage(data);
									showLargeDrawer();
								}}
								onClose={onClose}
							/>
						</Col>
					))}
				</Row>

				<Row gutter={{ xs: 8 }} className='flex items-center justify-center'>
					{!!data.length && (
						<Pagination defaultCurrent={1} total={data.length} className='!justify-center' />
					)}
				</Row>
			</div>
			{isSimilar && (
				<DrawerSimilar
					onPickNewImage={(data) => setActiveImage(data)}
					photoName={activeImage?.photoName}
					onClose={onClose}
					open={open}
				/>
			)}

			<Drawer
				placement='right'
				size={"default"}
				width={"500px"}
				onClose={onClose}
				// maskClosable={false}
				zIndex={99999}
				mask={false}
				open={open}
				extra={
					<Space>
						<Button onClick={onClose} className='!rounded-lg'>
							Cancel
						</Button>
						<Button type='default' className='!rounded-lg' onClick={onClose}>
							Edit
						</Button>
					</Space>
				}>
				<p className='font-semibold' style={{ marginBottom: 24 }}>
					Photo name: {detailsImage?.photoName}
				</p>
				<p className='font-semibold'>Models detect</p>
				<Row>
					<Col span={12}>
						<DescriptionItem title='Type' content='Image/png' />
					</Col>
					<Col span={12}>
						<DescriptionItem title='Descriptions' content={detailsImage?.description} />
					</Col>
				</Row>

				<Divider />
				<p className='font-semibold'>Model detections</p>
				<Row className='gap-2'>
					<DescriptionItem title='Tags' content='' />
					<Space size={[0, 8]} wrap>
						{detailsImage?.tag
							?.split(",")

							.map((item) => (
								<Tag
									color={getRandomColor()}
									key={item}
									className='flex items-center gap-1 capitalize'>
									{item}
								</Tag>
							))}
					</Space>
				</Row>
				<Row className='gap-2'>
					<DescriptionItem title='Models name' content='' />
					<Space size={[0, 8]} wrap>
						{detailsImage?.modelName?.split(",").map((item) => (
							<Tag
								color={getRandomColor()}
								key={item}
								className='flex items-center gap-1 capitalize'>
								{item}
							</Tag>
						))}
					</Space>
				</Row>
				<Divider />
				<p className='font-semibold'>Details Model</p>

				<Row className='gap-2'>
					<Col span={24}>
						<DescriptionItem title='Clothes' content='' />
						<Space size={[0, 8]} wrap>
							{detailsImage?.clothes?.split(",").map((item) => (
								<Tag
									color={getRandomColor()}
									key={item}
									className='flex items-center gap-1 capitalize'>
									{item}
								</Tag>
							))}
						</Space>
					</Col>
				</Row>
				<Row className='gap-2'>
					<Col span={24}>
						<DescriptionItem title='Clothings' content='' />
						<Space size={[0, 8]} wrap>
							{detailsImage?.clothing?.split(",").map((item) => (
								<Tag
									color={getRandomColor()}
									key={item}
									className='flex items-center gap-1 capitalize'>
									{item}
								</Tag>
							))}
						</Space>
					</Col>
				</Row>
				<Row className='gap-2'>
					<Col span={24}>
						<DescriptionItem title='Prospects' content='' />
						<Space size={[0, 8]} wrap>
							{detailsImage?.prospect?.split(",").map((item) => (
								<Tag
									color={getRandomColor()}
									key={item}
									className='flex items-center gap-1 capitalize'>
									{item}
								</Tag>
							))}
						</Space>
					</Col>
				</Row>

				<Row className='gap-2'>
					<Col span={24}>
						<DescriptionItem title='Person' content='' />
						<Space size={[0, 8]} wrap>
							{detailsImage?.person?.split(",").map((item) => (
								<Tag
									color={getRandomColor()}
									key={item}
									className='flex items-center gap-1 capitalize'>
									{item}
								</Tag>
							))}
						</Space>
					</Col>
				</Row>

				<Row className='gap-2'>
					<Col span={24}>
						<DescriptionItem title='Deep clothing' content='' />
						<Space size={[0, 8]} wrap>
							{detailsImage?.deepClothing?.split(",").map((item) => (
								<Tag
									color={getRandomColor()}
									key={item}
									className='flex items-center gap-1 capitalize'>
									{item}
								</Tag>
							))}
						</Space>
					</Col>
				</Row>
				<Row className='gap-2'>
					<Col span={12}>
						<DescriptionItem title='Digital Signature' content='' />
						<Space direction='vertical' align='center'>
							<QRCode
								value={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" || "-"}
								// status="expired"
								onRefresh={() => console.log("refresh")}
							/>
						</Space>
					</Col>

					<Col span={12}>
						<DescriptionItem title='Share url link' content />
						<Space direction='vertical' align='center'>
							<QRCode
								value={detailsImage?.photo_directory || "-"}
								// status="expired"
								onRefresh={() => console.log("refresh")}
							/>
						</Space>
					</Col>
				</Row>
			</Drawer>
		</div>
	);
};

export default PreviewImages;
