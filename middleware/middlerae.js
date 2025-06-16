import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export function authenticate(hanlder){
    return async(req) =>{
        const authHeader = req.headers.get("authorization")
        
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return NextResponse.json({message:"Unauthorized"},{status:589})
        }
        const token = authHeader.split(" ")[1]
        try{
            const decoded = jwt.verify(token,process.env.NEXT_PUBLIC_SECRET_KEY);
            return hanlder(req,decoded)
        }catch(error){
            return NextResponse.json({message:"Invalid token"},{status:401})
        }
    }
}