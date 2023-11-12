import { Avatar } from "antd";
import TextArea from "antd/es/input/TextArea";
import { BsDot } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { VscSend } from "react-icons/vsc";

const PostItem = () => {
	return (
		<div className="flex flex-col gap-4 max-w-lg w-[540px] m-auto">
			<div className="flex">
				<div className="flex items-center flex-1 gap-2">
					<Avatar
						style={{ backgroundColor: "#7265e6", verticalAlign: "middle" }}
						size="small"
						gap={2}>
						Edward
					</Avatar>
					<div className="flex items-center gap-1">
						<h3 className="font-semibold text-xs">tuyenn_mup</h3>
						<BsDot />
						<p className="font-semibold text-xs">day ago</p>
					</div>
				</div>
				<div className="p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-100 cursor-pointer">
					<MdOutlineMoreHoriz size={20} />
				</div>
			</div>
			<div className="w-full h-[600px] shadow-sm border border-neutral-100 bg-white rounded-lg"></div>
			<div className="flex gap-3">
				<span className="p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-neutral-100 cursor-pointer transition-all ease-linear duration-200">
					<GrFavorite size={20} />
				</span>
				<span className="p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-neutral-100 cursor-pointer transition-all ease-linear duration-200">
					<FaRegComment size={20} />
				</span>
				<span className="p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-neutral-100 cursor-pointer transition-all ease-linear duration-200">
					<TbSend size={20} />
				</span>
			</div>
			<div className="flex items-center gap-0.5">
				<Avatar
					alt=""
					size="small"
					className="!w-4 !h-4"
					src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
				/>
				<Avatar
					alt=""
					size="small"
					className="!w-4 !h-4"
					src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
				/>
				<Avatar
					alt=""
					size="small"
					className="!w-4 !h-4"
					src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
				/>
				<p className="font-semibold text-xs pl-2">11 likes</p>
			</div>
			<div className="flex items-center gap-3">
				<TextArea
					placeholder="Enter comment..."
					maxLength={200}
					className=" !outline-none py-3 !rounded-md  !rounded-b-none !ring-0 !border-0 !border-neutral-200 !border-b !text-xs"
					autoSize={{ minRows: 2, maxRows: 4 }}
					showCount
				/>
				<span className="p-1 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-md cursor-pointer transition-all ease-linear duration-200">
					<VscSend size={14} />
				</span>
			</div>
		</div>
	);
};

export default PostItem;
