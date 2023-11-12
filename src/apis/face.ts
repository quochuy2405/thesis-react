import { UploadFile } from "antd";
import { unauth } from "./axios";

export const getImageByFaces = (id: string) => {
	return unauth().post(`/face-detect/${id}`, {
		croppedPhotoName: ["DSC09638_crop_4", "DSC09638_crop_3"],
	});
};

export const getImageByFaceUpload = (id: string, files: UploadFile[]) => {
	const form = new FormData();
	for (const file of files) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		form.append("files", file.originFileObj as any);
	}
	return unauth().post(`/face-detect/${id}`, {
		croppedPhotoName: ["DSC09638_crop_4", "DSC09638_crop_3"],
		files: form,
	});
};
