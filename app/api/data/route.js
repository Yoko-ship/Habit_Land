import { pool } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(){
    const createUser = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL
    )
    `

    const request = `
        CREATE TABLE IF NOT EXISTS habits(
            id VARCHAR PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            name VARCHAR NOT NULL,
            category VARCHAR NOT NULL,
            reminder TIMESTAMP NOT NULL,
            date DATE NOT NULL,
            duration INTEGER NOT NULL
        )
    `
    const progressRequest = `
        CREATE TABLE IF NOT EXISTS progress(
            id SERIAL PRIMARY KEY,
            habit_id VARCHAR NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
            progress_date DATE NOT NULL,
            done BOOLEAN DEFAULT FALSE,
            UNIQUE(habit_id,progress_date)
        )
    `

    await pool.query(createUser)
    await pool.query(request)
    await pool.query(progressRequest)

    const getHabits = `SELECT * FROM habits`
    const getHabitResult = (await pool.query(getHabits)).rows
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
    return NextResponse.json(result)
    
}
export async function POST(req){
    const body = await req.json()
    const {id,name,category,date,duration,reminder} = body
    const request = `
        INSERT INTO habits(id,name,category,reminder,date,duration) VALUES($1,$2,$3,$4,$5,$6)
    `
    await pool.query(request,[id,name,category,reminder,date,duration])
    return NextResponse.json({success:"Данные успешно записаны"},{status:200})
}

export async function DELETE(req){
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const request = "DELETE FROM habits WHERE id = $1"
    await pool.query(request,[id])
    return NextResponse.json({success:"Вы успешно удалили строку"})
}