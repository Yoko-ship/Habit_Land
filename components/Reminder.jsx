"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
function Reminder({ id }) {
  const [startReminder, setStartReminder] = useState(false);
  const [reminderName, setReminderName] = useState(null);
  const [reminderTime, setReminderTime] = useState(null);
  // const {data,error,isLoading} = useQuery(["reminder"])

  const reminderHandler = async () => {
    const response = await fetch(`/api/progress?id=${id}`);
    const data = await response.json();
    setReminderName(data[0].name);
    setReminderTime(data[0].reminder);
    setStartReminder(true);
  };

  const sendNotification = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    if (Notification.permission === "granted") {
      new Notification("Время выполнения привычки", {
        body: `Пора выполнить привычку ${reminderName}`,
      });
    }
  };

  useEffect(() => {
    if (!startReminder || !reminderTime) return;
    const reminder = new Date(reminderTime);
    const now = new Date();
    const diff = reminder - now;
    if (diff <= 0) {
      sendNotification();
      setStartReminder(false);
    } else {
      const timer = setTimeout(() => {
        sendNotification();
        setStartReminder(false);
      }, diff);
      return () => clearTimeout(timer);
    }
  }, [startReminder, reminderTime]);

  return <button onClick={reminderHandler}>Напомнить</button>;
}

export default Reminder;
