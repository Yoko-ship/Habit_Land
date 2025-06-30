"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import classes from "@/app/page.module.css"
import { useSelector,useDispatch} from "react-redux";
import { handleToken, upgradeHabit } from "@/store/habits";
function LoginHeader() {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.habits.token)

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      dispatch(handleToken(getToken))
    }
  }, [dispatch]);

  const leaveButton = ()=>{
    localStorage.removeItem("token")
    dispatch(handleToken(null))
    dispatch(upgradeHabit([]))
  }
  
  return (
    <>
      {!token ? (
        <li>
          <Link href="/login">Войти</Link>
        </li>
      ) : (
        <li onClick={leaveButton} className={classes.leave}>
            Выйти
        </li>
      )}
    </>
  );
}

export default LoginHeader;
