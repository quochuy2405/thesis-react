import { Button, Image, Spin, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import Upload, { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useState } from "react";
import { BiCamera } from "react-icons/bi";
import { BsSendCheck } from "react-icons/bs";
import { SlTrash } from "react-icons/sl";
import { VscLoading } from "react-icons/vsc";
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result as string));
	reader.readAsDataURL(img);
};
const CreateStory = () => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();
	const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
		setLoading(true);
		// Get this url from response in real world.
		getBase64(info.file.originFileObj as RcFile, (url) => {
			setLoading(false);
			setImageUrl(url);
		});
	};

	return (
		<div className='max-w-[500px] m-auto flex flex-col gap-2'>
			<h3 className='text-base font-semibold'>Post</h3>
			<div className='flex items-center gap-3'>
				<TextArea
					placeholder='Enter comment...'
					maxLength={200}
					className=' !outline-none py-3 !rounded-md  !rounded-b-none !ring-0 !border-0 !border-neutral-200 !border-b !text-xs'
					autoSize={{ minRows: 2, maxRows: 4 }}
					showCount
				/>
				<Upload multiple showUploadList={false} onChange={handleChange}>
					<div className='p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100/50 cursor-pointer'>
						<BiCamera size={30} />
					</div>
				</Upload>
			</div>
			<div className='pt-10'>
				{loading && (
					<div className='flex-1 w-full flex items-center justify-center'>
						<Spin
							indicator={
								<span className='animate-spin'>
									<VscLoading />
								</span>
							}
						/>
					</div>
				)}
				{imageUrl && (
					<div>
						<div
							className='p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100/50 cursor-pointer'
							onClick={()=>setImageUrl(undefined)}>
							<SlTrash size={30} />
						</div>
						<Image src={imageUrl} alt='avatar' style={{ width: "100%" }} />
					</div>
				)}
			</div>
			<div className='flex justify-end'>
				<Button
					icon={<BsSendCheck />}
					htmlType='submit'
					className='button-form !font-medium mt-6 flex items-center justify-center !bg-emerald-400 text-xs !text-white border-none px-3 !h-[30px] !w-[100px] flex-row-reverse gap-2'>
					Publish
				</Button>
			</div>
		</div>
	);
};

export default CreateStory;
