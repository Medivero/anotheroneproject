import { ApiURL } from "../store/api";

export function deleteDataById(id:string){
    console.log(typeof id)
    return fetch(ApiURL+`posts/${id}`,{
        method:"DELETE"
    }).then((res) => {
        if (res.ok){
            console.log(`Запись с id:${id} удалена`)
            return res
        }
        else{
            console.log("Что-то пошло не так", res.statusText)
            return res.status
        }
    })
}