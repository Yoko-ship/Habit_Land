import axios from "axios";
import { redirect } from "next/navigation";

export const handleHabits = async(prevState,formData)=>{
    const name = formData.get("name");
    const category = formData.get("category");
    const reminder = formData.get("reminder");
    const date = formData.get("date");
    const duration = formData.get("duration");
    const id = Date.now()
    if(!name || !category || !date || !duration) return
    await axios.post("/api/data",{id,name,category,date,duration,reminder})
    .then(response =>  redirect("/"))
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
        const response =  await axios.post("/api/register",{email,password})
        return response.data
    }catch(err){
        // console.log(err)
        return err.response?.data ? err.response.data : err.response.message
    }
}