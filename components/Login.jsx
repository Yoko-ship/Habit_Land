'use client'

import React, { useEffect } from 'react'
import classes from "./auth.module.css"
import Link from 'next/link'
import { useActionState } from 'react'
import { handleLogin } from '@/lib/handler'
import { useRouter } from 'next/navigation'
function Login() {
  
  
  const [data,actionFn] = useActionState(handleLogin,null)
  const router = useRouter()
  useEffect(() =>{
    if(data && data.token){
      const token = data.token
      localStorage.setItem('token',token)
      router.push('/')
    }
  },[data])

  return (
    <main className={classes.main}>
    <form className={classes.form} action={actionFn}>
        <label>Почта</label>
        <input type='email' name='email'/>
        <label>Пароль</label>
        <input type='password' name='password'/>
        <button>Войти</button>
        <div className={classes.registerLink}>
            <Link href="/register">Нет аккаунта!?<strong>Зарегистрироваться</strong></Link>
        </div>

        {data && data.error &&(
          <p className={classes.error}>{data.error}</p>
        )}
    </form>
    </main>
  )
}

export default Login