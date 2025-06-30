import axios from "axios";
import { redirect } from "next/navigation";

export const handleHabits = async(prevState,formData)=>{
    const name = formData.get("name");
    const category = formData.get("category");
    const reminder = formData.get("reminder");
    const date = formData.get("date");
    const duration = formData.get("duration");
    const token = formData.get("token")
    const id = Date.now()
    if(!name || !category || !date || !duration) return
    
    const response = await fetch("/api/data",{
        method:"POST",
        headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({id,name,category,date,duration,reminder})
    })
    if(response.ok){
        redirect("/")
    }
} 

export const handleRegister = async(prevState,formData)=>{
    const email = formData.get("email");
    const password = formData.get("password");
    if(!email || !password){
        return {error:"Пожалуста заполните все поля"}
    }
    if(password.length < 7){
        return {error:"Длина пароля должна быть не меньше семи символов"}
    }
    
    try{
        const response =  await fetch("/api/register",{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({email,password})
        })
        const data = await response.json()
        return data
    }catch(err){
        return err.response?.data ? err.response.data : err.response?.message
    }
}

export const handleLogin = async(prevState,formData)=>{
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email)
    if(!email || !password){
        return {error:"Пожалуста заполните все поля"}
    }
    if(password.length < 7){
        return {error:"Длина пароля должна быть не меньше семи символов"}
    }
    
    try{
        const response = await fetch("/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await response.json()
        return data
    }catch(err){
        return err.response?.data ? err.response.data : err.response?.message
    }
}