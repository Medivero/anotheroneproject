import { ApiURL } from "../store/api";

export default function postData(formObj:any[]) {
    try{
        fetch(ApiURL+"posts",{
            method: "POST",
            body: JSON.stringify(formObj)
        }).then(() => {
            console.log(formObj);
            console.log("Успешно добавлено!")
        })
    } catch(error){
        console.log(error)
    }
}