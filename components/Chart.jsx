"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import classes from "./form.module.css";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

function Chart() {
  const [information, setInformation] = useState(null);

  // useEffect(() => {
  //   const getValues = async () => {
  //     const response = await axios.get("/api/data");
  //     const data = response.data;

  //     const labels = data.map((dat) => dat.name);
  //     const values = data.map(dat => dat.progress)
  //     const result = Object.assign({},...values)
  //     console.log(result)

  //     const expensesData = {
  //       labels,
  //       datasets: [
  //         {
  //           label: "Прогресс по привычкам",
  //           data: values,
  //           backgroundColor: [
  //             "#FF6384",
  //             "#36A2EB",
  //             "#FFCE56",
  //             "#4BC0C0",
  //             "#9966FF",
  //             "#FF9F40",
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     };
  //     setInformation(expensesData);
  //   };
  //   getValues();
  // }, []);
  return (
    // <div className={classes.chart}>
    //   <div className={classes.pies}>
    //     {information && <Pie data={information} />}
    //   </div>
    // </div>
  );
}

export default Chart;
