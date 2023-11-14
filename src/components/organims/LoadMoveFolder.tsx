/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { pushDirectoryMove, setDirectoriesCurrent, setDirectoryMove } from "@/redux/features/directorymove";
import { RootState } from "@/redux/store";
import { PhotoDirectory } from "@/types/image";
import { arrayToTree } from "@/utils/common";
import { Breadcrumb, Button, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { getAllFolderByUserId } from "../../apis/folder";
import { DirectoryRow } from "../molercules";

const LoadMoveFolder = () => {
	const [loading, setLoading] = useState(true);
	const directoryMove = useSelector((state: RootState) => state.directorymove.currentPath);
	const directoriesTree = useSelector((state: RootState) => state.directorymove.directoriesTree);
	const dispatch = useDispatch();
	const refDirectories = useRef<object>({});

	const reset = async () => {
		refDirectories.current = {};
		dispatch(setDirectoriesCurrent({}));
		dispatch(setDirectoryMove("/"));
	};

	const fetch = async () => {
		await reset();
		setLoading(true);

		await getAllFolderByUserId("1")
			.then(({ data }) => {
				const disecs = data
					?.filter((item: PhotoDirectory) => !!item.photoDirectory?.startsWith("/"))
					.map((_item: PhotoDirectory) => _item.photoDirectory);

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
				dispatch(setDirectoriesCurrent(tree));
			})
			.finally(() => setLoading(false));
	};
	useEffect(() => {
		fetch();
	

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='flex flex-col gap-3 h-fit max-h-[50vh]'>
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
						...directoryMove
							?.split("/")
							?.map((item: string, index: number, array: any) => {
								return {
									title: item,
									className:
										"hover:cursor-pointer  hover:bg-neutral-100 !rounded-md py-1 text-xs px-2 uppercase",
									onClick: () => {
										dispatch(setDirectoryMove(array.slice(0, index + 1).join("/")));
									},
								};
							})
							?.filter((item: any) => !!item.title),
					]}
				/>
				<div className='flex items-center gap-4 '>
					<Button
						// icon={<MdRestore size={16} />}
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
					Object?.keys(directoriesTree)?.map((name) => (
						<DirectoryRow
							key={name}
							name={name}
							isFolder={!!directoriesTree[name]}
							onClick={() => {
								// eslint-disable-next-line no-extra-boolean-cast
								if (!!directoriesTree[name]) dispatch(pushDirectoryMove(name));
							}}
						/>
					))}
			</div>
		</div>
	);
};

export default (LoadMoveFolder);
