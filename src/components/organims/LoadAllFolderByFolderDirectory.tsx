/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FOLDER_PREFIX } from "@/constants/index";
import { pushDirectory, setDirectoriesCurrent, setDirectory } from "@/redux/features/directory";
import { RootState } from "@/redux/store";
import { PhotoDirectory } from "@/types/image";
import { arrayToTree } from "@/utils/common";
import { Breadcrumb, Button, Input, Modal, Spin, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { VscLoading } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { createFolderFromDirectory, getAllFolderByUserId } from "../../apis/folder";
import { DirectoryRow } from "../molercules";

const LoadAllFolderByUserId = () => {
	const [loading, setLoading] = useState(true);
	const [messageApi, contextHolder] = message.useMessage({ maxCount: 1 });
	const [openNewDir, setOpenNewDir] = useState(false);
	const directory = useSelector((state: RootState) => state.directory.currentPath);
	const directoriesTree = useSelector((state: RootState) => state.directory.directoriesTree);
	const dispatch = useDispatch();
	const refDirectories = useRef<object>({});
	const formNewDir = useForm({
		defaultValues: {
			directory: "",
		},
	});

	const reset = async () => {
		refDirectories.current = {};
		dispatch(setDirectoriesCurrent({}));
		dispatch(setDirectory("/"));
	};

	const fetch = async () => {
		await reset();
		setLoading(true);

		await getAllFolderByUserId("1")
			.then(({ data }) => {
				const disecs = data
					?.filter((item: PhotoDirectory) => !!item.photoDirectory?.startsWith("/"))
					.map((_item: PhotoDirectory) => _item.photoDirectory.replace(FOLDER_PREFIX, ""));

				const tree: any = arrayToTree(disecs, "/");
				refDirectories.current = tree;
				dispatch(setDirectoriesCurrent(tree));
			})
			.finally(() => setLoading(false));
	};

	const refresh = async () => {
		setLoading(true);
		await reset();
		await getAllFolderByUserId("1")
			.then(({ data }) => {
				const disecs = data
					?.filter((item: PhotoDirectory) => !!item.photoDirectory?.startsWith("/"))
					.map((_item: PhotoDirectory) => _item.photoDirectory);

				const tree: any = arrayToTree(disecs, "/");
				refDirectories.current = tree;
				dispatch(setDirectoriesCurrent(directoriesTree));
			})
			.finally(() => setLoading(false));
	};
	const handleCreateFolder = async (data: { directory: string }) => {
		const directoryNew = data.directory.trim();
		if (!directoryNew) {
			messageApi.open({
				type: "error",
				content: "Enter new directory!",
				duration: 10,
			});
			return;
		}

		let path = directoryNew;
		if (directory.length > 1) {
			path = [directory, directoryNew].join("/");
		}
		await createFolderFromDirectory({
			userId: 1,
			newDir: path,
		}).finally(() => {
			onCancelDir();
		});
	};
	const onError = () => {
		messageApi.open({
			type: "error",
			content: "Enter new directory!",
			duration: 10,
		});
	};
	const onCancelDir = () => {
		setOpenNewDir(false);
		formNewDir.reset({});
	};
	useEffect(() => {
		fetch();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='flex flex-col gap-3 h-fit max-h-[50vh]'>
			{contextHolder}
			<Modal
				okType='primary'
				open={openNewDir}
				title='Create new folder'
				onOk={formNewDir.handleSubmit(handleCreateFolder, onError)}
				onCancel={onCancelDir}>
				<Controller
					name='directory'
					control={formNewDir.control}
					defaultValue={""}
					rules={{ required: true }}
					render={({ field }) => (
						<Input
							{...field}
							className='w-full h-full !rounded-[6px] !outline-none !border-emerald-400 border-2 !ring-0 ring-gray-500 px-4 py-2 pr-6 !text-sm !font-medium'
						/>
					)}
				/>
			</Modal>
			<div className='flex items-center justify-between'>
				<Breadcrumb
					separator='>'
					items={[
						{
							title: "Your folder",
							className:
								"hover:cursor-pointer hover:bg-neutral-100 !font-semibold !rounded-md py-1 text-xs px-2 uppercase text-emerald-400",
							onClick: () => {
								fetch();
							},
						},
						...directory
							?.split("/")
							?.map((item: string, index: number, array: any) => {
								return {
									title: item,
									className:
										"hover:cursor-pointer  hover:bg-neutral-100 !rounded-md py-1 text-xs px-2 uppercase",
									onClick: () => {
										dispatch(setDirectory(array.slice(0, index + 1).join("/")));
									},
								};
							})
							?.filter((item: any) => !!item.title),
					]}
				/>
				<div className='flex items-center gap-4 '>
					<Button
						// icon={<MdRestore size={16} />}
						onClick={() => setOpenNewDir(true)}
						className='font-normal items-center flex justify-center text-xs !rounded-lg'>
						Create folder
					</Button>
					<Button
						// icon={<MdRestore size={16} />}
						className='font-normal items-center flex justify-center text-xs !rounded-lg'>
						Upload
					</Button>
					<Button
						// icon={<MdRestore size={16} />}
						onClick={async () => await refresh()}
						className='font-normal items-center flex justify-center text-xs !rounded-lg'>
						Refresh
					</Button>
				</div>
			</div>

			<div className='flex flex-col gap-1 pb-4 pt-2 flex-1 overflow-y-auto min-h-[60px]'>
				{loading && !Object?.keys(directoriesTree).length && (
					<Spin
						indicator={
							<span className='animate-spin'>
								<VscLoading />
							</span>
						}
					/>
				)}

				{!loading &&
					Object?.keys(directoriesTree)?.map((name) => {
            const isFolder = !!directoriesTree[name] || !name.split('.')?.[1];
            console.log('first', name.split('.')?.[1])
            console.log('name', name)
						return (
							<DirectoryRow
								key={name}
                name={name}
                disabled={!name.split('.')?.[1] && !directoriesTree[name] }
								isFolder={isFolder}
								onClick={() => {
									// eslint-disable-next-line no-extra-boolean-cast
									if (!!directoriesTree[name]) dispatch(pushDirectory(name));
								}}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default LoadAllFolderByUserId;
