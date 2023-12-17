import { unauth } from "./axios";

export const getAllFolderByUserId = (id: string) => {
	return unauth().get(`/photo-directory/${id}`);
};

type CreateDirectory = {
	userId: number;
	newDir: string;
};

export const createFolderFromDirectory = ({ newDir, userId }: CreateDirectory) => {
	return unauth().post(`/directory/add`, {
		userId,
		newDir,
	});
};
