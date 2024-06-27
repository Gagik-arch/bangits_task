import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoes";

const store = configureStore({
    reducer: {
        todoes: todoReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
