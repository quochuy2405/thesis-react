/* eslint-disable @typescript-eslint/no-explicit-any */
// CommentTree.js
import { Avatar } from "antd";

const Comment = ({ comment }: any) => {
	const { id, user, text, depth, children } = comment;
	const marginLeft = depth * 10; // Adjust the indentation based on your design

	return (
		<div className={`p-2 pr-0 relative w-full`} key={id}>
			{/* SVG Line */}

			<div
				className='w-[2px] mt-8 left-5 absolute bg-emerald-300'
				style={{
					height: `${children?.length * 40}px`,
				}}></div>
			<div className='flex gap-2 relative'>
				<Avatar
					className='min-w-8 min-h-8 object-cover relative z-[2]'
					src='https://i.pinimg.com/564x/19/2b/aa/192baa78f58f9af71a75bddedf158e60.jpg'
				/>
				{/* Comment Content */}
				{!comment?.isTop && (
					<div className='border-2 border-b-emerald-300 border-l-emerald-300 w-4 h-4 absolute -left-3 top-[5px] rounded-bl-md border-transparent'></div>
				)}

				<div
					className={`bg-white border-b border-emerald-50/90 p-2 flex-col flex gap-2 pr-0 w-full ml-${marginLeft}`}>
					<h2 className='font-semibold text-[10px]'>{user}</h2>
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
interface CommentTreeProps {
	comments: any;
	isCollape: boolean;
	size?: number;
	onShowMore: () => void;
}
const CommentTree: React.FC<CommentTreeProps> = ({ comments, isCollape, size, onShowMore }) => {
	return (
		<div className='space-y-4'>
			{comments?.slice(0, isCollape ? size : -1).map((comment: any) => (
				<Comment key={comment.id} comment={comment} />
			))}
			{
				<div
					onClick={onShowMore}
					className='p-2 rounded-lg w-fit h-8 flex text-[10px] m-auto items-center justify-center hover:bg-neutral-100 cursor-pointer'>
					{!isCollape ? "Show more ..." : "... Minize"}
				</div>
			}
		</div>
	);
};

export default CommentTree;
