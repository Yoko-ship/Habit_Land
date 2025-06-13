
import { pool } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){
    const body = await req.json()
    const { email,password } = body
    
    const checkEmail = `SELECT email FROM users`
    const checkedEmail = await pool.query(checkEmail)
    const result = checkedEmail.rows.find(check => check.email === email)
    if(result){
        return NextResponse.json({error:"Данный эмейл уже существует"},{status:409})
    }
    const request = "INSERT INTO users(email,password) VALUES($1,$2)"
    await pool.query(request,[email,password])
    return NextResponse.json({success:"Вы успешно авторизовались"},{status:201})
}