import { ApiURL } from "../store/api";
const limit = 20;
export async function getData(page:number) {
    const res = await fetch(ApiURL+`posts?_page=${page}&_per_page=${limit}`,{
        method: "GET"
    })
    try{
        const data = res.json();
        console.log(data)
        return data
    } catch(error){
        console.error(error)
    }
}