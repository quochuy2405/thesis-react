import {
	FileViewItem,
	FolderStorageItem,
	HeaderSearch,
	TableRecent,
} from "@/components/molercules";
import { LoadAllFolderByUserId } from "@/components/organims";
import { Col, Row } from "antd";
import { memo } from "react";

const Page = () => {
	return (
		<div className='flex flex-col h-full '>
			<HeaderSearch title='All Folder' />
			<div className='flex-1 w-full h-full bg-white py-6 px-2 overflow-y-auto'>
				<LoadAllFolderByUserId />
				<h2 className='uppercase px-2 font-semibold text-xs text-black/50'>Favorites Folder</h2>
				<Row gutter={{ xs: 12 }}>
					{[1, 2, 3, 4, 5].map((item) => (
						<Col key={item} className='gutter-row p-2' span={8}>
							<FolderStorageItem key={item} />
						</Col>
					))}
				</Row>

				<h2 className='uppercase px-2 font-semibold text-xs text-black/50'>quick access</h2>
				<Row gutter={{ xs: 12 }}>
					{[1, 2, 3, 4, 5].map((item) => (
						<Col key={item} className='gutter-row p-2 ' span={8}>
							<FileViewItem />
						</Col>
					))}
				</Row>
				<h2 className='uppercase px-2 font-semibold text-xs text-black/50'>recent upload file</h2>
				<TableRecent />
			</div>
		</div>
	);
};

export default memo(Page);
