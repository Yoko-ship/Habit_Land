import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  habits: [],
  token: "",
};
export const handleHabits = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      state.habits.push(action.payload);
      console.log(state.habits);
    },
    upgradeHabit: (state, action) => {
      state.habits = action.payload;
    },
    removeHabit: (state, action) => {
      const filteredItem = state.habits.filter(
        (item) => item.id !== action.payload
      );
      state.habits = filteredItem;
      axios.delete("/api/data", {
        params: { id: action.payload },
      });
    },
    toggleProgress: (state, action) => {
      const { id, date } = action.payload;
      const habit = state.habits.find((h) => h.id === id);
      if (habit) {
        const prev = habit.progress[date] || false;
        habit.progress[date] = !prev;
      }
    },
    handleToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {
  addHabit,
  removeHabit,
  toggleProgress,
  upgradeHabit,
  handleToken,
} = handleHabits.actions;
export default handleHabits.reducer;
