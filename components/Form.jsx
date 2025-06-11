"use client";

import React, { useEffect } from "react";
import classes from "./form.module.css";
import { useActionState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHabit } from "@/store/habits";
import axios from "axios";
function Form() {
  const dispatch = useDispatch();
  const habit = useSelector((state) => state.habits.habits)
  const handleData = async(prevState, formData) => {
    const name = formData.get("name");
    const category = formData.get("category");
    const goal = formData.get("goal");
    const date = formData.get("date");
    const duration = formData.get("duration");
    const id = Date.now()
    const progress = {}
    console.log(progress)
    dispatch(
      addHabit({
        id,
        name,
        category,
        goal,
        date,
        duration,
        progress,
      })
    );
    await axios.post("/api/data",{id,name,category,date,duration,goal})
    .then(response => console.log("Вы успешно добавили товар"))
  };
  const [data, actionHandler, isPending] = useActionState(handleData, "");
  

  return (
    <main className={classes.main}>
      <form action={actionHandler}>
        <label>Название привычки</label>
        <input type="text" name="name" required />
        <label>Категория</label>
        <select name="category">
          <option>Здоровье</option>
          <option>Образование</option>
          <option>Дом</option>
          <option>Другое</option>
        </select>
        <label>Цель</label>
        <input type="text" name="goal" required />
        <label>Дата начала</label>
        <input type="date" name="date" required />
        <label>Продолжительность</label>
        <input type="number" name="duration" required min={10} max={30}/>

        <button>Создать привычку</button>
      </form>
    </main>
  );
}

export default Form;
