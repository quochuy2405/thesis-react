
import type { UploadProps } from "antd";
import { Upload } from "antd";
import React from "react";
import { FaFileArrowUp } from "react-icons/fa6";
const { Dragger } = Upload;

const UploadFiles: React.FC<UploadProps> = (props) => (
	<Dragger
		showUploadList={false}
		className="flex flex-1 w-full"
		beforeUpload={() => false}
		style={{ background: "#71e0b80f" }}
		{...props}>
		<div className="flex flex-1 w-full flex-col items-center justify-center gap-2 h-20">
			<p className="text-emerald-400">
				<FaFileArrowUp size={24} />
			</p>
			<p className="uppercase text-[10px] font-semibold text-emerald-400">
				Drop your file here
			</p>
		</div>
	</Dragger>
);

export default UploadFiles;
