import { createSlice } from "@reduxjs/toolkit";
import { ToDo } from "../../types";

type SliceState = ToDo[];

const initialState: SliceState = [];

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        updateOnLoad(state, action: { payload: ToDo[] }) {
            state.push(...action.payload);
        },

        add(state, action) {
            state.push(action.payload);
            const currentState = JSON.parse(JSON.stringify(state));
            localStorage.setItem("state", JSON.stringify(currentState));
        },

        delete(state, action) {
            const todo: ToDo | undefined = state.find(
                (todo: ToDo) => todo.id === action.payload
            );
            if (todo) {
                todo.status = -1;

                const currentState: ToDo[] = JSON.parse(JSON.stringify(state));
                localStorage.setItem("state", JSON.stringify(currentState));
            }
        },
        complete(state, action) {
            const todo: ToDo | undefined = state.find(
                (todo: ToDo) => todo.id === action.payload
            );
            if (todo) {
                todo.status = 1;

                const currentState: ToDo[] = JSON.parse(JSON.stringify(state));

                localStorage.setItem("state", JSON.stringify(currentState));
            }
        },

        overdue(state, action) {
            const todo: ToDo | undefined = state.find(
                (todo: ToDo) => todo.id === action.payload
            );
            if (todo) {
                todo.status = 2;

                const currentState: ToDo[] = JSON.parse(JSON.stringify(state));
                localStorage.setItem("state", JSON.stringify(currentState));
            }
        },
    },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
