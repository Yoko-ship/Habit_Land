import { configureStore } from "@reduxjs/toolkit";
import handleHabitReducer from "@/store/habits"
export const store = configureStore({
    reducer:{
        habits:handleHabitReducer
    }
})
