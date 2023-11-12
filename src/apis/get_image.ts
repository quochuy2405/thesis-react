import { unauth } from "./axios";

export const getImageByTagsMatchAll = async (tags: Array<string>) => {
	return await unauth().post("results/findByTagsAll", { tags });
};
export const getImageByTagsContains = async (tags: Array<string>) => {
	return await unauth().post("results/findByTagsIn", { tags });
};

export const getImageAll = async (uid: string) => {
	return await unauth().get(`/photo/${uid}`);
};

