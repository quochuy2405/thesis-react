import { HeaderSearch } from "@/components/molercules";
import { LoadAllFolderByFolderDirectory } from "@/components/organims";
import { useParams } from "react-router-dom";

const FolderManage = () => {
	const params = useParams();
	console.log("params", params);
	return (
		<div className='flex flex-col h-full '>
			<HeaderSearch title='All Folder' />
			<div className='flex-1 w-full h-full bg-white py-6 px-2 overflow-y-auto'>
				<LoadAllFolderByFolderDirectory />
			</div>
		</div>
	);
};

export default FolderManage;
