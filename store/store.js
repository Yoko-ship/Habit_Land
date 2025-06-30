import { configureStore } from "@reduxjs/toolkit";
import handleHabitReducer from "./habits"
export const store = configureStore({
    reducer:{
        habits:handleHabitReducer
    }
})
