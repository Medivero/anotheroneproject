import { ApiURL } from "../store/api";

export async function getData() {
    
    const res = await fetch(ApiURL+"posts",{
        method: "GET"
    })
    try{
        const data = await res.json()
        await console.log(data)
        return data;
    }
    catch(error){
        console.log(error)
    }
}