
import { HeaderSearch, TableTrash } from "@/components/molercules";

const Page = () => {
	return (
		<div className='flex flex-col h-full bg-white'>
			<HeaderSearch title='Trash' />
			<div className='flex-1 w-full h-full bg-white py-6 px-2 flex flex-col overflow-y-auto'>
				<TableTrash />
			</div>
		</div>
	);
};

export default Page;
