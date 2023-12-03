
import { HeaderSearch, TableTrash } from "@/components/molercules";

const Page = () => {
	return (
		<div className='flex flex-col h-full bg-white'>
			<HeaderSearch title='Trash' />
			<div className='flex-1 w-full h-full bg-white p-4 flex flex-col overflow-y-auto'>
				<TableTrash />
			</div>
		</div>
	);
};

export default Page;
