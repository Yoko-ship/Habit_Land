"use client";
import React, { useEffect } from "react";
import classes from "@/app/page.module.css";
import { useSelector } from "react-redux";
import ButtonHanlders from "./ButtonHanlders";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeHabit, toggleProgress, upgradeHabit } from "@/store/habits";
import { store } from "@/store/store";
function Main() {
  const habits = useSelector((state) => state.habits.habits);
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];

  const removeHanlder = (id) => {
    dispatch(removeHabit(id));
    axios.delete("/api/data",{id})
    .then(response => console.log("Вы успешно удалили таблицу"))
  };

  const onToggleProgress = (id) => {
    dispatch(toggleProgress({ id: id, date: today }));
    setTimeout(() =>{
      const updatedHabit = store.getState().habits.habits.find(h => h.id === id)
      const progressData = Object.keys(updatedHabit.progress).toString()
      const isDone = Object.values(updatedHabit.progress).toString()
      axios.post("/api/progress",{id,progressData,isDone})
    },0)
  };


  useEffect(() =>{
    const createTable = async()=>{
      await axios.get("/api/data")
      .then(response => {
        dispatch(upgradeHabit(response.data))
      })
      
    }
    createTable()
  },[])



  return (
    <main className={classes.main}>
      <h2 className={classes.info}>Привычки</h2>
      <section className={classes.grid}>
        {habits &&
          habits.map((habit, index) => (
            <div className={classes.grids} key={index}>
              <h3>Название: {habit.name}</h3>
              <p>
                Категория: <strong>{habit.category}</strong>
              </p>
              <p>
                Цель: <strong>{habit.goal}</strong>
              </p>
              <p>
                Продолжительность: <strong>{habit.duration}</strong>
              </p>
              <p>
                Частота: <strong>{habit.frequency}</strong>
              </p>
              <p>
                Начало: <strong>{habit.date}</strong>
              </p>
              <div className={classes.menu}>
                <button onClick={() => removeHanlder(habit.id)}>Удалить</button>
                <button onClick={() => onToggleProgress(habit.id)}>
                  {habit.progress?.[today]
                    ? "✅ Сегодня сделано"
                    : "Отметить как сделано"}
                </button>
              </div>
              <ButtonHanlders
                habitId={habit.id}
                habit={habits}
                key={habit.id}
                habitDuration={habit.duration}
                habitProgress={habit.progress}
                habitStartDate={habit.date}
              />
            </div>
          ))}
      </section>
    </main>
  );
}

export default Main;
