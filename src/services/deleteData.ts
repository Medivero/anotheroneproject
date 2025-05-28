import { ApiURL } from "../store/api";

export default function deleteDataById(id:string){
    console.log(typeof id)
    fetch(ApiURL+`posts/${id}`,{
        method:"DELETE"
    }).then(() => {
        console.log(`Запись с id:${id} удалена`)
    })
}