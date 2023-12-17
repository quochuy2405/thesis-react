import { getImageAll } from "@/apis/get_image";
import { HeaderSearch } from "@/components/molercules";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IMAGE_PREFIX } from "../constants";
import { PhotoDirectory } from "@/types/image";

const columns = 3; // Adjust the number of columns as needed
interface RenderMasonryGridProps {
	images: Array<PhotoDirectory>;
}
const RenderMasonryGrid: React.FC<RenderMasonryGridProps> = ({ images }) => {
	const grid = [];
	for (let i = 0; i < columns; i++) {
		grid.push(
			<div key={i} className='grid gap-2'>
				{images
					.filter((_, index) => index % columns === i)
					.map((photo, index) => (
						<div key={index} className="rounded-lg overflow-hidden">
							<Image
              className='h-auto max-w-full !rounded-lg overflow-hidden'
								src={IMAGE_PREFIX + "1/" + photo.photoName.replace(".jpg", "")}
								alt={`Image ${index + 1}`}
							/>
						</div>
					))}
			</div>
		);
	}
	return grid;
};

const Public = () => {
	const dispatch = useDispatch();

	const [images, setImages] = useState<PhotoDirectory[]>([]);

	useEffect(() => {
		dispatch(startLoading());
		// Assuming `getImageAll` returns a promise
		getImageAll("1")
			.then((res) => {
				const data = res.data;
				console.log("data", data);
				// Assuming the API response contains an array of image URLs
				setImages(data || []);
			})
			.catch(() => {
				setImages([]);
			})
			.finally(() => {
				dispatch(closeLoading());
			});
	}, [dispatch]);

	return (
		<div className='flex flex-col h-full bg-white'>
			{/* Header */}
			<HeaderSearch title='Public picture' />

			{/* Main Content */}
			<div className='flex-1 w-full h-full bg-white p-4 flex flex-col overflow-y-auto'>
				<div className='grid grid-cols-3 gap-3'>
					<RenderMasonryGrid images={images} />
				</div>
			</div>
		</div>
	);
};

export default Public;
