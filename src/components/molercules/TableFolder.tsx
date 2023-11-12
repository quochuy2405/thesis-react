
import { Table } from "antd";
import moment from "moment";
import { BiSolidVideos } from "react-icons/bi";
import { BsFolder, BsImage } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi2";
const IconByType = {
	img: <BsImage size={18} />,
	doc: <HiDocumentText size={20} />,
	video: <BiSolidVideos size={18} />,
	folder: <BsFolder size={18} />,
};

const IconColor = {
	img: "text-[#00DFA2]",
	doc: "text-[#0079FF]",
	video: "text-[#E1AA74]",
	folder: "text-yellow-600",
};
type DataTableType = {
	key: string;
	name: string;
	type: string;
};
const TableFolder = () => {
	const dataSource = [
		{
			key: "1",
			name: "User interface",
			type: "folder",
			size: "1 MB",
			owner: "10 Downing ",
			modified: new Date(),
		},
		{
			key: "2",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
		{
			key: "3",
			name: "Video dog and cat",
			type: "video",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
		{
			key: "4",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
		{
			key: "5",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
		{
			key: "6",
			name: "Video dog and cat",
			type: "img",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},

		{
			key: "7",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},

		{
			key: "8",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
		{
			key: "9",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},

		{
			key: "10",
			name: "Video dog and cat",
			type: "video",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},

		{
			key: "11",
			name: "Video dog and cat",
			type: "video",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
		{
			key: "2",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
		{
			key: "3",
			name: "Video dog and cat",
			type: "video",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
		{
			key: "4",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
		{
			key: "5",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
		{
			key: "6",
			name: "Video dog and cat",
			type: "img",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},

		{
			key: "7",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},

		{
			key: "8",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
		{
			key: "9",
			name: "Video dog and cat",
			type: "doc",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},

		{
			key: "10",
			name: "Video dog and cat",
			type: "video",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},

		{
			key: "11",
			name: "Video dog and cat",
			type: "video",
			size: "1 MB",
			owner: "10 Downing",
			modified: new Date(),
		},
	];

	const columns: Array<any> = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			className: "text-xs",
			render: (text: string, record: any) => {
				return (
					<div className="flex items-center gap-2 cursor-pointer">
						<span
							className={`${[
								IconColor[record.type as keyof typeof IconColor],
							]}`}>
							{IconByType[record.type as keyof typeof IconByType]}
						</span>
						<p className="font-normal text-xs">{text}</p>
					</div>
				);
			},
		},
		{
			title: "Size",
			dataIndex: "size",
			key: "size",
			className: "text-xs",
			render: (text: string) => <p className="font-normal text-xs">{text}</p>,
		},
		{
			title: "Owner",
			dataIndex: "owner",
			key: "owner",
			className: "text-xs",
			render: (text: string) => <p className="font-normal text-xs">{text}</p>,
		},
		{
			title: "Last Modified",
			dataIndex: "modified",
			key: "modified",
			className: "text-xs",
			render: (text: string) => (
				<p className="font-normal text-xs">
					{moment(text).format("MMMM, DD YYYY")}
				</p>
			),
		},
	];

	return (
		<Table dataSource={dataSource} scroll={{ y: 860 }} columns={columns} />
	);
};

export default TableFolder;
