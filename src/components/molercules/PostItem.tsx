import { Avatar, Dropdown, Image, MenuProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { CgLockUnlock } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite, MdOutlineMoreHoriz } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { VscSend } from "react-icons/vsc";
import CommentTree from "./CommentTree";

const PostItem = () => {
	const [like, setLike] = useState(false);
	const [isCollape, setIsCollape] = useState(false);
	const post = useForm({
		defaultValues: {
			message: "",
		},
	});
	const [comments, setComments] = useState([
		{
			id: 1,
			user: "User1",
			text: "Comment 1",
			isTop: 1,
			depth: 0,
			children: [
				{
					id: 2,
					user: "User2",
					text: "Reply to Comment 1",
					depth: 1,
					children: [{ id: 3, user: "User3", text: "Reply to Reply 1", depth: 2 }],
				},
			],
		},
		{ id: 4, isTop: 1, user: "User4", text: "Comment 2", depth: 0 },
	]);

	const items: MenuProps["items"] = [
		{
			label: "Private",
			key: "2",
			icon: <CgLockUnlock />,
		},
		{
			label: "Delete",
			key: "3",
			icon: <AiFillDelete />,
			danger: true,
		},
	];
	const handleMenuClick: MenuProps["onClick"] = (e) => {
		console.log("click", e);
	};
	const menuProps = {
		items,
		onClick: handleMenuClick,
	};
	const onSend = useCallback((data: { message: string }) => {
		post.reset({});
		setComments((curr) => [
			...curr,
			{ id: 5, isTop: 1, user: "User4", text: data.message, depth: 0 },
		]);
	}, []);

	return (
		<div className='flex flex-col gap-4 max-w-lg w-[540px] m-auto'>
			<div className='flex'>
				<div className='flex items-center flex-1 gap-2'>
					<Avatar
						style={{ backgroundColor: "#7265e6", verticalAlign: "middle" }}
						size='small'
						gap={2}>
						Edward
					</Avatar>
					<div className='flex items-center gap-1'>
						<h3 className='font-semibold text-xs'>alshba</h3>
						<BsDot />
						<p className='font-semibold text-xs'>day ago</p>
					</div>
				</div>
				<Dropdown menu={menuProps}>
					<div className='p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-100 cursor-pointer'>
						<MdOutlineMoreHoriz size={20} />
					</div>
				</Dropdown>
			</div>
			<Image
				src='https://i.pinimg.com/564x/b6/a9/ec/b6a9ecef2355335acdc15679353b2006.jpg'
				className='w-full !h-[600px] object-contain shadow-sm border border-neutral-100 bg-white rounded-lg'
				alt=''></Image>
			<div className='flex gap-3'>
				<span
					className={clsx(
						"p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-neutral-100 cursor-pointer transition-all ease-linear duration-200"
					)}
					onClick={() => setLike((e) => !e)}>
					{like ? (
						<GrFavorite size={20} color='red' />
					) : (
						<MdOutlineFavorite size={200} color='red' />
					)}
				</span>
				<span className='p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-neutral-100 cursor-pointer transition-all ease-linear duration-200'>
					<FaRegComment size={20} />
				</span>
				<span className='p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-neutral-100 cursor-pointer transition-all ease-linear duration-200'>
					<TbSend size={20} />
				</span>
			</div>
			<div className='flex items-center gap-0.5'>
				<Avatar.Group>
					<Avatar
						alt=''
						size='small'
						className='!w-6 !h-6'
						src='https://i.pinimg.com/564x/c3/49/d9/c349d947876c527a409cc9677da2d2a0.jpg'
					/>
					<Avatar
						alt=''
						size='small'
						className='!w-6 !h-6'
						src='https://i.pinimg.com/564x/b4/8e/8d/b48e8de8301b6793d810ee3ada2bf24b.jpg'
					/>
					<Avatar
						alt=''
						size='small'
						className='!w-6 !h-6'
						src='https://i.pinimg.com/564x/19/2b/aa/192baa78f58f9af71a75bddedf158e60.jpg'
					/>
				</Avatar.Group>

				<p className='font-semibold text-xs pl-2'>11 likes</p>
			</div>
			<CommentTree
				isCollape={isCollape}
				comments={comments}
				onShowMore={() => setIsCollape((curr) => !curr)}
			/>
			<form className='flex items-center gap-3' onSubmit={post.handleSubmit(onSend)}>
				<Controller
					name='message'
					defaultValue=''
					control={post.control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextArea
							placeholder='Enter comment...'
							maxLength={200}
							value={field.value}
							onChange={field.onChange}
							className=' !outline-none py-3 !rounded-md  !rounded-b-none !ring-0 !border-0 !border-neutral-200 !border-b !text-xs'
							autoSize={{ minRows: 2, maxRows: 4 }}
							showCount
						/>
					)}
				/>
				<button
					type='submit'
					className='p-1 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-md cursor-pointer transition-all ease-linear duration-200'>
					<VscSend size={14} />
				</button>
			</form>
		</div>
	);
};

export default PostItem;
