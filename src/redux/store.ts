import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import directory from "./features/directory";
import fileprogress from "./features/fileprogress";
import loading from "./features/loading";
import storage from "./features/storage";
import detect from "./features/detect";

export const store = configureStore({
	reducer: { directory, loading, fileprogress, storage, detect },
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
