import { ApiURL } from "../store/api";

export default function postData(formObj:any[]) {
    fetch(ApiURL+"posts",{
        method: "POST",
        body: JSON.stringify(formObj)
    })
}