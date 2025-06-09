import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
export  async function POST(req){
    const body = await req.json()
    const {id,progressData,isDone} = body
    const request = `
    INSERT INTO progress(habit_id,progress_date,done) VALUES($1,$2,$3)
    ON CONFLICT (habit_id,progress_date)
    DO UPDATE SET done = EXCLUDED.done
    `
    const result = await pool.query(request,[id,progressData,isDone])
    if(!result){
        console.log("Произошли ошибка при создании таблицы")
    }
    return NextResponse.json({success:"Вы успешно сохранили данные"},{status:201})
}