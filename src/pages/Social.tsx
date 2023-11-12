import { HeaderStory, PostItem } from "@/components/molercules";

const Social = () => {
	return (
		<div className='flex flex-col h-full bg-white'>
			<div className='w-full overflow-auto relative'>
				{/* <Carousel dotPosition={"top"} autoplay>
					<div>
						<h3 className="h-[300px] bg-white w-full">1</h3>
					</div>
					<div>
						<h3 className="h-[300px] bg-white w-full">2</h3>
					</div>
					<div>
						<h3 className="h-[300px] bg-white w-full">3</h3>
					</div>
					<div>
						<h3 className="h-[300px] bg-white w-full">4</h3>
					</div>
				</Carousel> */}
				<HeaderStory />
				<div className='flex flex-col gap-8 p-4'>
					{[1, 2, 3, 4, 5].map((item) => (
						<PostItem key={item} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Social;
