import { createSlice } from "@reduxjs/toolkit";
export type MoveType = {
	show: boolean;
	name: string;
};
const initialState: MoveType = {
	show: false,
	name: "",
};
export const moveSlice = createSlice({
	name: "move",
	initialState,
	reducers: {
		openMove: (state, { payload }) => {
			state.show = true;
			state.name = payload;
			return state;
		},
		closeMove: (state) => {
			state.show = false;
			return state;
		},
	},
});

export const { openMove, closeMove } = moveSlice.actions;
export default moveSlice.reducer;
