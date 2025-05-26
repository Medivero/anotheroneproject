import { ApiURL } from "../store/api";

async function getData() {
    const res = await fetch(ApiURL+"posts",{
        method: "GET"
    })
}