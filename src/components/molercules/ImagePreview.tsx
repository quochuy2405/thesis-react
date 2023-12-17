import { IMAGE_PREFIX } from "@/constants/index";
import type { ImageType } from "@/types/image";
import { getRandomColor } from "@/utils/common";
import { Button, Checkbox, Form, Image, Modal, Select, Space, Tag, Watermark, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useMemo, useState } from "react";
import { MdOutlineDriveFileMove, MdOutlineFavoriteBorder } from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
interface ImagePreviewProps {
	onClick: (data: ImageType) => void;
	onClose: () => void;
	data: ImageType;
}

interface LocalizedModalProps {
	onClose: () => void;
	open: boolean;
	data: ImageType;
}

const LocalizedModal: React.FC<LocalizedModalProps> = ({ onClose, open, data }) => {
	const [form] = Form.useForm();
	const [required, setRequired] = useState(false);

	const onReset = () => {
		form.resetFields();
	};

	const onFinish = async () => {
		try {
			const values = await form.validateFields();
			console.log("Submit:", values);
			onReset();
			onClose();
		} catch (errInfo) {
			message.warning("");
		}
	};

	return (
		<>
			<Modal footer='' title={`Public image ${data.photoName}`} onCancel={onClose} open={open}>
				<Form
					labelAlign='left'
					labelWrap
					labelCol={{ flex: "145px" }}
					wrapperCol={{ flex: 1 }}
					colon={false}
					form={form}
					layout='horizontal'
					onFinish={onFinish}>
					<Form.Item name='steganography' label='Steganography'>
						<Checkbox
							value={required}
							title='Steganography'
							onChange={(e) => setRequired(e.target.checked)}
						/>
					</Form.Item>
					<Form.Item
						name='message'
						label='Message Hidden'
						valuePropName='steganography'
						rules={[{ required }]}>
						<TextArea />
					</Form.Item>
					<Form.Item label='User participants' name='users' rules={[{ required }]}>
						<Select mode='multiple'>
							<Select.Option value='1'>user 1</Select.Option>
							<Select.Option value='2'>user 2</Select.Option>
							<Select.Option value='3'>user 2</Select.Option>
							<Select.Option value='4'>user 2</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label=' '>
						<Space>
							<Button htmlType='button' onClick={onReset}>
								Cancel
							</Button>
							<Button type='primary' htmlType='submit'>
								Public
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ onClick, onClose, data }) => {
	const [model, setModel] = useState(false);

	const tags = useMemo(() => {
		return data.tag
			?.split(",")
			.slice(0, 4)
			.map((item) => (
				<Tag color={getRandomColor()} key={item} className='flex items-center gap-1 capitalize'>
					{item}
				</Tag>
			));
	}, [data.tag]);
	return (
		<div className='w-full h-fit p-1 flex flex-col hover:bg-neutral-50 rounded-md cursor-pointer relative'>
			<div className='w-full h-fit relative image-preview'>
				<Watermark content='Thesis'>
					<Image
						preview={{
							movable: true,
							minScale: 0.3,
							onVisibleChange(value) {
								if (!value) onClose();
								else onClick(data);
							},
						}}
						loading={"lazy"}
						alt=''
						className='!rounded-md !h-[400px] w-full object-cover'
						src={IMAGE_PREFIX + "1/" + data.photoName}
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

						<div
							className='w-8 h-8 rounded-full text-black transition-all ease-linear duration-200 hover:bg-black/80 hover:!text-white flex items-center justify-center'
							onClick={() => setModel(true)}>
							<PiShareFat size={20} />
						</div>
					</div>
				</div>
			</div>
			<LocalizedModal data={data} open={model} onClose={() => setModel(false)} />
			<div className='py-2 flex flex-col gap-2 h-fit'>
				<h2 className='font-semibold text-sm'>{data?.photoName}</h2>

				<Space size={[0, 8]} wrap>
					{tags}
				</Space>
			</div>
		</div>
	);
};

export default ImagePreview;
