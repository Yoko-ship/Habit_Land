"use client";
import React, { useEffect, useState } from "react";
import classes from "@/app/page.module.css";
import { useSelector } from "react-redux";
import ButtonHanlders from "./ButtonHanlders";
import { useDispatch } from "react-redux";
import { sendProgressData } from "./https";
import {
  removeHabit,
  toggleProgress,
  upgradeHabit,
  handleToken,
} from "@/store/habits";
import { store } from "@/store/store";
import Reminder from "./Reminder";
import { useMutation, useQuery } from "@tanstack/react-query";
function Main() {
  const habits = useSelector((state) => state.habits.habits);
  const token = useSelector((state) => state.habits.token);
  const [filteredHabits, setFilteredHabits] = useState(habits);
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];



  const mutation = useMutation({
    mutationKey:['post-progress'],
    mutationFn:sendProgressData,
    onSuccess:() =>{
      console.log("Успешно запостил")
    },
    onError:()=>{
      console.log("Произошла ошибка при посте")
    }
  })

  const removeHanlder = async(id) => {
    dispatch(removeHabit(id));
    const updatedElement = filteredHabits.filter((habit) => habit.id !== id);
    setFilteredHabits(updatedElement);
    const response = await fetch(`/api/data?id=${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
  };

  const onToggleProgress = (id, progress) => {
    dispatch(toggleProgress({ id, date: today }));
    if (!progress[today]) {
      const didVibrate = navigator.vibrate(200);
    }
    setTimeout(() => {
      const updatedHabit = store
        .getState()
        .habits.habits.find((h) => h.id === id);
      const progressData = Object.keys(updatedHabit.progress);

      const isDone = Object.values(updatedHabit.progress);
      mutation.mutate({id,progressData,isDone})
    }, 0);
  };

  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) {
      dispatch(handleToken(tok));
    }
  }, [dispatch]);

  const {data,error,isLoading} = useQuery({
    queryKey:['userHabits'],
    queryFn:async()=>{
      const res = await fetch("/api/data",{
        method:"GET",
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(!res.ok)throw new Error("Failed to fetch")
      return res.json()
    },
    enabled: Boolean(token), //только если есть токен
    // staleTime:1000 * 60 * 5, // Кеш
  })

  
  useEffect(() =>{
    if(data){
      dispatch(upgradeHabit(data))
    }
  },[data,dispatch])

  useEffect(() => {
    if (!habits.length) return;

    if (filter === "Все" || !filter) {
      setFilteredHabits(habits);
    } else {
      const filtered = habits.filter((habit) => habit.category === filter);
      setFilteredHabits(filtered);
    }
  }, [filter, habits]);

  //Всегда hanldim в конце
  if(isLoading){
    return <p>Загрузка...</p>
  }
  if(error){
    return <p>Ошибка: {error.message}</p>
  }



  return (
    <main className={classes.main}>
      <h2 className={classes.info}>Привычки</h2>
      <section className={classes.filter}>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option>Все</option>
          <option>Здоровье</option>
          <option>Образование</option>
          <option>Дом</option>
          <option>Другое</option>
        </select>
      </section>
      {token && (
        <section className={classes.grid}>
          {filteredHabits &&
            filteredHabits.map((habit, index) => (
              <div className={classes.grids} key={index}>
                <h3>Название: {habit.name}</h3>
                <p>
                  Категория: <strong>{habit.category}</strong>
                </p>
                <p>
                  Продолжительность: <strong>{habit.duration}</strong>
                </p>
                <p>
                  Начало: <strong>{habit.date}</strong>
                </p>
                <p>
                  Напоминания: <strong>{habit.reminder.split("T")[0]}</strong>
                </p>
                <div className={classes.menu}>
                  <Reminder id={habit.id} />
                  <button onClick={() => removeHanlder(habit.id)}>
                    Удалить
                  </button>
                  <button
                    onClick={() => onToggleProgress(habit.id, habit.progress)}
                  >
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
      )}
    </main>
  );
}

export default Main;
