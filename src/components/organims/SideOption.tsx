import { openModelFiles, setFiles } from "@/redux/features/fileprogress";
import { RootState } from "@/redux/store";
import { Avatar, Badge, Layout } from "antd";
import { BiUser } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { BuildGNN, UploadFiles } from "../molercules";

const SideOption = () => {
	const files = useSelector((state: RootState) => state.fileprogress.files);
	const storage = useSelector((state: RootState) => state.storage);
	const dispatch = useDispatch();
	return (
		<Layout.Sider width={300} trigger={null} style={{ border: "none" }}>
			<div className='flex flex-col h-full pb-10 w-full bg-[#effff821] py-4 gap-4 shadow-md'>
				<div className='px-2 flex items-center justify-between'>
					<div className='flex gap-2'>
						<Avatar
							className='!flex !items-center !justify-center'
							size={36}
							icon={<BiUser size={20} />}
						/>
						<div className='flex flex-col'>
							<p className='text-xs font-light text-black/50'>Welcome Back</p>
							<h2 className='font-semibold text-xs'>
								{[storage?.firstName, storage.lastName].join(" ")}
							</h2>
						</div>
					</div>
					<Badge dot size='small' count={5} color='#34d399f7'>
						<IoMdNotifications size={18} />
					</Badge>
				</div>
				<div className='p-4'>
					<UploadFiles
						fileList={files}
						onChange={(info) => {
							const { status } = info.file;
							dispatch(openModelFiles());
							if (status !== "uploading") {
								const files = info.fileList;
								dispatch(setFiles({ files }));
							}
							if (status === "done") {
								console.log("done");
							} else if (status === "error") {
								console.log("error");
							}
						}}
						multiple
					/>
				</div>
				<BuildGNN />
			</div>
		</Layout.Sider>
	);
};

export default SideOption;
