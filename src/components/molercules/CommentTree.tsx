/* eslint-disable @typescript-eslint/no-explicit-any */
// CommentTree.js
import { Avatar } from "antd";
import { useState } from "react";

const Comment = ({ comment }: any) => {
	const { id, user, text, depth, children } = comment;
	const marginLeft = depth * 10; // Adjust the indentation based on your design

	return (
		<div className={`p-2 pr-0 relative w-full`} key={id}>
			{/* SVG Line */}

			<div
				className='w-[2px] mt-8 left-5 absolute bg-neutral-300'
				style={{
					height: `${children?.length * 40}px`,
				}}></div>
			<div className='flex gap-2 relative'>
				<Avatar className="min-w-8 min-h-8 object-cover relative z-[2]" src='https://i.pinimg.com/564x/19/2b/aa/192baa78f58f9af71a75bddedf158e60.jpg' />
				{/* Comment Content */}
				{!comment?.isTop && (
					<div className='border-2 border-b-neutral-300 border-l-neutral-300 w-4 h-4 absolute -left-3 top-[5px] rounded-bl-md border-transparent'></div>
				)}

				<div className={`bg-neutral-50 shadow-sm border border-neutral-100 p-2 pr-0 rounded-lg w-full ml-${marginLeft}`}>
					<h2 className='font-semibold text-xs'>{user}</h2>
					<p className='text-xs'>{text}</p>
				</div>
			</div>

			{/* Render Children */}
			{children && (
				<div className='ml-4 space-y-2'>
					{children.map((child: any) => (
						<Comment key={child.id} comment={child} />
					))}
				</div>
			)}
		</div>
	);
};
const CommentTree = () => {
	const [comments] = useState([
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
	return (
		<div className='space-y-4'>
			{comments.map((comment) => (
				<Comment key={comment.id} comment={comment} />
			))}
		</div>
	);
};

export default CommentTree;
