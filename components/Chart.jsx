"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import classes from "./form.module.css";
import axios from "axios";
function Chart() {
  const [habits, setHabits] = useState();

  useEffect(() => {
    const getHabits = async () => {
      await axios.get("/api/data").then((response) => {
        setHabits(response.data);
      });
    };
    getHabits();
  }, []);


  const dowloadHabits = ()=>{
    if(!habits) return
    const json = JSON.stringify(habits,null,2)
    const blob = new Blob([json],{type:'application/json'})
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "data.json";
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
  return (
    <main className={classes}>
      <section className={classes.stats}>
        <h2>Статистика привычек</h2>
        <button onClick={dowloadHabits}>Скачать данные </button>
      </section>
      <div className={classes.chart}>
        {habits &&
          habits.map((habit, index) => {
            const data = Object.entries(habit.progress).map(([date, done]) => ({
              date,
              done: done ? 1 : 0,
            }));
            return (
              <div key={index} className={classes.pie}>
                <h3>{habit.name}</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data}>
                    <XAxis dataKey={"date"} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="done" fill="green" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        ;
      </div>
    </main>
  );
}

export default Chart;
