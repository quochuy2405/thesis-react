import { unauth } from "./axios";

export const getAllFolderByUserId = (id: string) => {
		
	return unauth().get(`/photo/${id}`);
};
