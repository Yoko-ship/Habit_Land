import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SECRET_CODE = process.env.NEXT_PUBLIC_SECRET_KEY
export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const checkEmail = `SELECT email FROM users`;
  const checkedEmail = await pool.query(checkEmail);
  const result = checkedEmail.rows.find((check) => check.email === email);
  if (result) {
    return NextResponse.json(
      { error: "Данный эмейл уже существует" },
      { status: 409 }
    );
  }
  const hashedPassword = await bcrypt.hash(password,10)
  const request = "INSERT INTO users(email,password) VALUES($1,$2) RETURNING id,email";
  const isUser = await pool.query(request, [email, hashedPassword]);
  const token = jwt.sign({id:isUser.rows[0].id,email:isUser.rows[0].email},SECRET_CODE,{
    expiresIn:"24h"
  })

  return NextResponse.json(
    { success: "Вы успешно авторизовались",token:token},
    { status: 201 }
  );
}
