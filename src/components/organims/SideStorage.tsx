
import { bytesToGB } from "@/utils/common";
import { Layout, Progress } from "antd";
import { getUserInfo } from "@/apis/user";
import { useEffect } from "react";
import { BiSolidBox, BiSolidVideos } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { setStorage } from "@/redux/features/storage";
import { RootState } from "@/redux/store";

const SideOption = () => {
	const storage = useSelector((state: RootState) => state.storage);
	const dispatch = useDispatch();
	const fetch = async () => {
		await getUserInfo("1").then(({ data }) => {
			dispatch(setStorage(data));
		});
	};
	useEffect(() => {
		fetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Layout.Sider trigger={null} style={{ border: "none" }} width={400} collapsed={false}>
			<div className='flex flex-col h-full pb-10 w-full bg-[#effff821] p-4 gap-4 border-l border-gray-100/50'>
				<h2 className='uppercase px-2 font-semibold text-xs text-black/50'>Storage</h2>
				<div className='w-full h-28 bg-emerald-50/50 rounded-lg p-4 flex flex-col justify-between'>
					<div className='flex items-center gap-2 justify-between text-xs'>
						<div className='flex items-center gap-2 text-emerald-400'>
							<BiSolidBox size={20} />
							<h2 className='font-medium text-emerald-400'>Disk C</h2>
						</div>
						<p className='font-semibold text-emerald-400'>{bytesToGB(+storage.availableDisk)}GB</p>
					</div>
					<Progress
						percent={+Math.floor(Number(bytesToGB(+storage.usedDisk) * 100)).toFixed(2)}
						status='active'
						strokeColor={{ from: "#34d399", to: "#7ffcda" }}
					/>
				</div>
				<h2 className='uppercase px-2 font-semibold text-xs text-black/50'>Details Storage</h2>
				<div className='flex flex-col gap-2'>
					<div className='w-full h-18 rounded-lg flex flex-col justify-between'>
						<div className='flex items-center gap-2 justify-between text-xs'>
							<div className='flex items-center gap-2'>
								<div className='p-2 bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center'>
									<HiDocumentText size={18} />
								</div>
								<div>
									<h2 className='font-medium uppercase'>Document</h2>
									<span className='text-[11px] font-normal'>1231 Files</span>
								</div>
							</div>
							<p className='font-semibold'>24GB</p>
						</div>
						<Progress
							percent={30.9}
							size='small'
							status='active'
							strokeColor={{ from: "#0079FF", to: "#0079FF" }}
						/>
					</div>
					<div className='w-full h-18 rounded-lg flex flex-col justify-between'>
						<div className='flex items-center gap-2 justify-between text-xs'>
							<div className='flex items-center gap-2'>
								<div className='p-2 bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center'>
									<BsImage size={18} />
								</div>
								<div>
									<h2 className='font-medium uppercase'>Images</h2>
									<span className='text-[11px] font-normal'>1231 Files</span>
								</div>
							</div>
							<p className='font-semibold'>24GB</p>
						</div>
						<Progress
							percent={35.9}
							size='small'
							status='active'
							strokeColor={{ from: "#00DFA2", to: "#00DFA2" }}
						/>
					</div>
					<div className='w-full h-18 rounded-lg flex flex-col justify-between'>
						<div className='flex items-center gap-2 justify-between text-xs'>
							<div className='flex items-center gap-2'>
								<div className='p-2 bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center'>
									<BiSolidVideos size={18} />
								</div>
								<div>
									<h2 className='font-medium uppercase'>videos</h2>
									<span className='text-[11px] font-normal'>1231 Files</span>
								</div>
							</div>
							<p className='font-semibold'>24GB</p>
						</div>
						<Progress
							percent={60.9}
							size='small'
							status='active'
							strokeColor={{ from: "#E1AA74", to: "#E1AA74" }}
						/>
					</div>
					<div className='w-full h-18 rounded-lg flex flex-col justify-between'>
						<div className='flex items-center gap-2 justify-between text-xs'>
							<div className='flex items-center gap-2'>
								<div className='p-2 bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center'>
									<HiDocumentText size={18} />
								</div>
								<div>
									<h2 className='font-medium uppercase'>others</h2>
									<span className='text-[11px] font-normal'>1231 Files</span>
								</div>
							</div>
							<p className='font-semibold'>24GB</p>
						</div>
						<Progress
							percent={10.9}
							size='small'
							status='active'
							strokeColor={{ from: "#27374D", to: "#27374D" }}
						/>
					</div>
				</div>
				<div className='flex-1 flex flex-col justify-end'>
				
				</div>
			</div>
		</Layout.Sider>
	);
};

export default SideOption;
