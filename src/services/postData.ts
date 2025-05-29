import { ApiURL } from "../store/api";

export async function postData(formObj: any) {
    const res = await fetch(ApiURL + "posts", {
        method: "POST",
        body: JSON.stringify(formObj)
    });
    if (res.ok) {
        console.log("Успешно добавлено", res.status);
        
    } else {
        throw new Error(`Ошибка ${res.status}`);
    }
}