import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todos",
    initialState: [{id: "potato"}],
    reducers: {
        addTodo: (state, action) => [...state, action.payload],
        removeTodo: (state, action) => state.filter(todo => todo.id !== action.payload)
    }
});

export const { addTodo, removeTodo } = todoSlice.actions;