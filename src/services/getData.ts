import { ApiURL } from "../store/api";

export async function getData() {
    const res = await fetch(ApiURL+"posts",{
        method: "GET"
    })
    const data = await res.json()
    return data;
}