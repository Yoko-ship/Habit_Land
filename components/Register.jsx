"use client";
import React, { useEffect, useState } from "react";
import classes from "./auth.module.css";
import { useActionState } from "react";
import { handleRegister } from "@/lib/handler";
import { useRouter } from "next/navigation";
function Register() {
  const [data, actionFn] = useActionState(handleRegister, null);
  const router = useRouter()
  useEffect(() =>{
        if(data && data.success){
            router.push("/")
        }
  },[data])


  return (
    <main className={classes.main}>
      <form className={classes.form} action={actionFn}>
        <label>Почта</label>
        <input type="email" name="email" />
        <label>Пароль</label>
        <input type="password" name="password" />
        <button>Зарегистрироваться</button>

        {data && data.error && <p className={classes.error}>{data.error}</p>}
      </form>
    </main>
  );
}

export default Register;
