import { HeaderSearch } from "@/components/molercules";
import { PreviewFileByFolderID } from "@/components/organims";

const Page = () => {
	return (
		<div className='flex flex-col h-full w-full flex-1 bg-white'>
			<HeaderSearch title='Private Folder' />
			<div className='p-4'>
				<PreviewFileByFolderID />
			</div>
		</div>
	);
};

export default Page;
