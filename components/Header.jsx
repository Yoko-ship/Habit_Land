import Link from 'next/link'
import React from 'react'
import classes from "@/app/page.module.css"
import LoginHeader from './LoginHeader'

function Header() {
  return (
    <header className={classes.header}>
        <ul>
            <li>
                <Link href="/">Главное меню</Link>
            </li>
            <li>
                <Link href="/habits">Привычки</Link>
            </li>
            <li><Link href="/stats">Cтатистика</Link></li>       
            <LoginHeader/>
        </ul>
    </header>
  )
}

export default Header