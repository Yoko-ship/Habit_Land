import { pool } from "@/lib/db"
import { NextResponse } from "next/server"
import { authenticate } from "@/middleware/middlerae"


async function getHanlder(req,user){
    const getHabits = `SELECT * FROM habits WHERE user_id = $1`
    const getHabitResult = (await pool.query(getHabits,[user.id])).rows
    const getProgress = `SELECT * FROM progress`
    const getProgressResult = (await pool.query(getProgress)).rows
    const result = getHabitResult.map((habit) =>{
        const habitDate = new Date(habit.date)
        habit.date = habitDate.toLocaleDateString("sv-SE")
        const habitProgress = getProgressResult
        .filter((p) => p.habit_id === habit.id)
        .reduce((acc,curr) =>{
            const date = new Date(curr.progress_date);
            const dataStr = date.toLocaleDateString("sv-SE")
            acc[dataStr] = curr.done;
            return acc
        },{})
        return {
            ...habit,progress:habitProgress
        }
    })
    console.log(result)
    return NextResponse.json(result)
    
}



async function handler(req,user){
    const body = await req.json()
    const {id,name,category,date,duration,reminder} = body
    const request = `
        INSERT INTO habits(id,user_id,name,category,reminder,date,duration) VALUES($1,$2,$3,$4,$5,$6,$7)
    `
    await pool.query(request,[id,user.id,name,category,reminder,date,duration])
    return NextResponse.json({success:"Данные успешно записаны"},{status:200})
}

export async function DELETE(req){
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    console.log(id)
    const request = "DELETE FROM habits WHERE id = $1"
    await pool.query(request,[id])
    return NextResponse.json({success:"Вы успешно удалили строку"})
}

export const POST = authenticate(handler)
export const GET = authenticate(getHanlder)