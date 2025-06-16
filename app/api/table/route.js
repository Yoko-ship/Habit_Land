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
    return NextResponse.json({success:"Вы успешно создали таблицу"})
}