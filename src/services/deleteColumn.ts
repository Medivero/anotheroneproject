import { ApiURL } from "../store/api";
import { getData } from "./getData";

export async function deleteColumnFromBd(key:string) {
    const data:any[] = await getData();
    try{
        for (const item of data){
            if (Object.keys(item).includes(key)){
                let newItem = {...item}
                delete newItem[key];
                console.log(newItem)
                await fetch(ApiURL+`posts/${item["id"]}`,{
                    method: "PUT",
                    body: JSON.stringify(newItem)
                })
            } else{
                continue;
            }
        }
    }
    catch(error){
        console.error(error)
    }
}