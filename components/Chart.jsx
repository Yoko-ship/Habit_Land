"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import classes from "./form.module.css";
import { useSelector } from "react-redux";
function Chart() {
  const token = useSelector((state) => state.habits.token)

  const {data,error,isLoading} = useQuery({
    queryKey:['chart'],
    queryFn: async()=>{
      const res = await fetch("/api/data",{
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(!res.ok) throw new Error("Failed to fetch data")
      return res.json()
    }
  })


  const dowloadHabits = () => {
    if (!data) return;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if(isLoading)return <p>Загрузка...</p>
  if(error) return <p>Ошибка:{error.message}</p>
  return (
    <main className={classes}>
      {token && (
        <>
          <section className={classes.stats}>
            <h2>Статистика привычек</h2>
            <button onClick={dowloadHabits}>Скачать данные </button>
          </section>
          <div className={classes.chart}>
            {data &&
              data.map((habit, index) => {
                const data = Object.entries(habit.progress).map(
                  ([date, done]) => ({
                    date,
                    done: done ? 1 : 0,
                  })
                );
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
        </>
      )}
      {!token && <h2 className={classes.warning}>Пожалуста войдите в аккаунт чтобы просмотреть статистику</h2>}
    </main>
  );
}

export default Chart;
