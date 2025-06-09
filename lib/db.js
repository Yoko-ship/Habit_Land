import { Pool } from "pg";
export const pool = new Pool({
    database:process.env.NEXT_PUBLIC_DBNAME,
    user:process.env.NEXT_PUBLIC_USER,
    host:process.env.NEXT_PUBLIC_HOST,
    password:process.env.NEXT_PUBLIC_PASSWORD,
    port:process.env.NEXT_PUBLIC_PORT,
})
