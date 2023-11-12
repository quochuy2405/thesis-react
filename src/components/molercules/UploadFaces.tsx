
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import clsx from "clsx";
import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
interface UploadFacesProps {
	hidden: boolean;
}
const UploadFaces: React.FC<UploadFacesProps> = ({ hidden }) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	// const [ setPreviewTitle] = useState("");
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		// setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
	};

	const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
		setFileList(newFileList);

	const uploadButton = (
		<div className="flex items-center justify-center flex-col gap-1">
			<div>
				<BsPlus size={20} />
			</div>
			<p className='font-medium text-neutral-600 text-[10px]' style={{ marginTop: 8 }}>
				Drop face
			</p>
		</div>
	);
	return (
		<div
			className={clsx("flex items-center justify-center flex-1", {
				hidden: !!hidden,
			})}>
			<Upload
				beforeUpload={() => false}
				listType='picture-circle'
				fileList={fileList}
				maxCount={5}
				onPreview={handlePreview}
				onChange={handleChange}>
				{fileList.length >= 5 ? null : uploadButton}
			</Upload>
			<Modal
				open={previewOpen}
				// title={previewTitle}
				footer={null}
				className='flex items-center justify-centern'
				onCancel={handleCancel}>
				<img alt='example' width={200} height={200} className='m-6' src={previewImage} />
			</Modal>
		</div>
	);
};

export default UploadFaces;
