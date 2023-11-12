import { UploadFile } from "antd";
import { unauth } from "./axios";

export const uploadFiles = async (
	files: UploadFile[],
	progressUpload: (percent: number) => void
) => {
	const form = new FormData();
	for (const file of files) {
		form.append("files", file.originFileObj as any);
	}
	const response = await unauth().post("/upload/1", form, {
		onUploadProgress: (progressEvent: any) => {
			const percentCompleted = Math.round(
				(progressEvent.loaded * 100) / progressEvent.total
			);
			progressUpload(percentCompleted);
		},
	});
	return response;
};


