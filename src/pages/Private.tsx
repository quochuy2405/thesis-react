import { TextField } from "@/components/atoms";
import { HeaderSearch } from "@/components/molercules";
import { PreviewFileByFolderID } from "@/components/organims";

const Page = () => {
	return (
		<div className='flex flex-col h-full w-full flex-1 bg-white'>
			<HeaderSearch title='Private Folder' />
			<div className='bg-white py-6 px-2 flex flex-col gap-2 w-[400px]'>
				<h2 className='uppercase px-2 font-semibold text-xs text-black/50'>Search</h2>
				<TextField />
			</div>
			<PreviewFileByFolderID />
		</div>
	);
};

export default Page;
