import { Button, Col, Progress, Row, message } from "antd";
import { uploadFiles } from "@/apis/upload";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeModelFiles, setProgress } from "@/redux/features/fileprogress";
import { RootState } from "@/redux/store";
import { FileViewItem, UploadFiles } from ".";
import { getUserInfo } from "@/apis/user";
import { setStorage } from "@/redux/features/storage";
import { startTrain } from "@/redux/features/detect";
import { AiOutlineCloudUpload } from "react-icons/ai";

const UploadFileModal = () => {
	const fileProgress = useSelector((state: RootState) => state.fileprogress);
	const dispatch = useDispatch();
	const [messageApi, contextHolder] = message.useMessage();

	if (!fileProgress.isShowModel) return <></>;
	const handleUpload = async () => {
		dispatch(setProgress(1));

		await uploadFiles(fileProgress.files, progressUpload).then(async () => {
			dispatch(startTrain());
			await getUserInfo("1").then(({ data }) => {
				dispatch(setStorage(data));
			});

			messageApi.open({
				type: "success",
				content: "Upload successfuly.",
				duration: 20,
			});
			setTimeout(() => {
				dispatch(closeModelFiles());
				dispatch(setProgress(0));
			}, 3000);
		});
	};
	const progressUpload = (percent: number) => {
		dispatch(setProgress(percent));
	};
	return (
		<>
			{contextHolder}
			<div className='fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-10 flex items-center justify-center bg-[#5250506e]'>
				<div className='z-20 w-[40%] h-5/6 bg-white rounded-lg shadow-lg p-4 flex flex-col'>
					<div className='flex items-center justify-between'>
						<h2 className='font-bold text-base'>Progress </h2>
						<div
							onClick={() => dispatch(closeModelFiles())}
							className='rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100/50 cursor-pointer'>
							<IoClose size={20} />
						</div>
					</div>
					<div className='w-2/3 m-auto'>
						<div className='w-full justify-self-end rounded-lg p-4 flex flex-col justify-between'>
							<div className='flex items-center gap-2 justify-between text-xs'>
								<div className='flex items-center gap-2 text-orange-400'>
									<span className='animate-pulse'>
										<AiOutlineCloudUpload size={20} color='#f97316' />
									</span>
									<h2 className='font-medium text-orange-400 animate-pulse'>Uploading...</h2>
								</div>
							</div>
							<Progress
								percent={fileProgress.progress}
								status='active'
								strokeColor={{ from: "#f97316", to: "#fdba74" }}
							/>
						</div>
					</div>

					<div className='w-full h-3/5 py-4 overflow-y-auto'>
						<Row gutter={{ xs: 8 }} className='flex gap-4 w-full flex items-center justify-center'>
							{fileProgress?.files?.map((file) => (
								<Col className='gutter-row  h-fit' span={11} key={file.uid}>
									<FileViewItem file={file} key={file.uid} />
								</Col>
							))}
						</Row>
					</div>
					<div className='py-3 m-auto'>
						<Button
							loading={fileProgress.progress > 0}
							onClick={handleUpload}
							className='button-form mt-2 flex items-center justify-center !bg-emerald-400 !text-white !border-none hover:!text-white !px-8'>
							Publish
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default UploadFileModal;
