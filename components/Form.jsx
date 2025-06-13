"use client";

import React from "react";
import classes from "./form.module.css";
import { useActionState } from "react";
import { handleHabits } from "@/lib/handler";
function Form() {
  const [data, actionHandler] = useActionState(handleHabits, "");
  

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
        <label>Напоминания</label>
        <input type="datetime-local" name="reminder" required />
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
