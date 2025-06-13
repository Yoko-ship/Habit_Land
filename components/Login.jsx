import React from 'react'
import classes from "./auth.module.css"
import Link from 'next/link'
function Login() {
  return (
    <main className={classes.main}>
    <form className={classes.form}>
        <label>Почта</label>
        <input type='email'/>
        <label>Пароль</label>
        <input type='password'/>
        <button>Войти</button>
        <div className={classes.registerLink}>
            <Link href="/register">Нет аккаунта!? <strong>Зарегистрироваться</strong></Link>
        </div>
    </form>
    </main>
  )
}

export default Login