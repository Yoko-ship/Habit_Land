import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export  async function POST(req){
    const body = await req.json()
    const {id,progressData,isDone} = body
    for (var i = 0; i < progressData.length;i++){
        const date = progressData[i]
        const done = isDone[i]
        const request = `
        INSERT INTO progress(habit_id,progress_date,done) VALUES($1,$2,$3)
        ON CONFLICT (habit_id,progress_date)
        DO UPDATE SET done = EXCLUDED.done
        `
        const result = await pool.query(request,[id,date,done])
        if(!result){
            console.log("Произошли ошибка при создании таблицы")
        }
    }

    return NextResponse.json({success:"Вы успешно сохранили данные"},{status:201})
}

export async function GET(req){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id")
    console.log(id)
    const request = "SELECT name,reminder FROM habits WHERE id = $1"
    const result = await pool.query(request,[id])
    if(!result){
        console.log("Произошла ошибка при получении дахнны")
    }
    return NextResponse.json(result.rows)
}