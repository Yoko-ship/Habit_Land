import { pool } from "@/lib/db"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const SECRET_CODE = process.env.NEXT_PUBLIC_SECRET_KEY
export async function POST(req){
    const body = await req.json()
    const {email,password} = body
    const request = `SELECT * FROM users WHERE email = $1`
    const isUser = await pool.query(request,[email])
    console.log(isUser.rowCount)
    if(isUser.rowCount === 0){
        return NextResponse.json({error:"Такой почты не существует"},{status:401})
    }
    const getHashedPassword = isUser.rows[0].password
    const comparedPassword = await bcrypt.compare(password,getHashedPassword)
    if(!comparedPassword){
        return NextResponse.json({error:"Неправильный пароль"},{status:401})
    }
    const token = jwt.sign({id:isUser.rows[0].id,email:isUser.rows[0].email},SECRET_CODE,{
        expiresIn:"24h"
    })
    return NextResponse.json({token:token,success:"Вы успешно вошли в аккаунт"},{status:201})
}