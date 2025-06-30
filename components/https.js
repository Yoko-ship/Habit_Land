export const sendProgressData = async({id,progressData,isDone})=>{
    const response = await fetch("/api/progress",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({id,progressData,isDone})
    })
    if(!response.ok) throw new Error("Failed to post progress")
    return response.json()
}