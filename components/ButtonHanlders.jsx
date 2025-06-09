"use client";

import React from "react";
import classes from "@/app/page.module.css";

function ButtonHanlders({habit,habitDuration,habitProgress,habitStartDate}) {

    function generateDaysForHabit() {
        
      return [...Array(parseInt(habitDuration))].map((_, i) => {
        const date = new Date(habitStartDate);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split("T")[0];
        return {
          date: dateStr,
          done: habitProgress?.[dateStr] || false,
        };
      });
    }



    const days = generateDaysForHabit()
  return (
    <>
      <div className={classes.calendarGrid}>
        {days.map((d, index) => (
          <div
            key={index}
            title={d.date}
            className={`${classes.calendar_day} ${d.done ? classes.done : ""}`}
          />
        ))}
      </div>
    </>
  );
}

export default ButtonHanlders;
