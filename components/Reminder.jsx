"use client";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
function Reminder({ id }) {
  const [startReminder, setStartReminder] = useState(false);
  const [reminderName, setReminderName] = useState(null);
  const [reminderTime, setReminderTime] = useState(null);

  const reminderHandler = async () => {
    const response = await axios
      .get(`/api/progress`, {
        params: { id },
      })
    const data = response.data[0]
    setReminderName(data.name)
    setReminderTime(data.reminder)
    setStartReminder(true)
  };

  useEffect(() => {
    
  }, []);

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
    if (!startReminder || !reminderTime) return
    const reminder = new Date(reminderTime);
    const now = new Date();
    const diff = reminder - now
    if(diff <= 0){
        sendNotification()
        setStartReminder(false)
    }else{
        const timer = setTimeout(() =>{
            sendNotification()
            setStartReminder(false)
        },diff)
        return () => clearTimeout(timer)
    }
  }, [startReminder,reminderTime]);

  return <button onClick={reminderHandler}>Напомнить</button>;
}

export default Reminder;
