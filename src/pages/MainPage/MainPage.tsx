import { useEffect, useState } from "react";
import { getData } from "../../services/getData";
import TableData from "../../widgets/table";
import { useForm } from "react-hook-form";
import postData from "../../services/postData";

function ResolveData(setDbData:Function,setKeys:Function){
    getData().then((data) => {
        setDbData(data);
        return data
    }).then((data) => {
        setKeys(Array.from(new Set(data.flatMap((obj) => Object.keys(obj)))))
    })
}

function MainPage(){
    const [dbData,setDbData] = useState([])
    let [keys,setKeys] = useState([]);
    useEffect(() => {
        ResolveData(setDbData,setKeys);
    },[])
    const {register,handleSubmit,reset} = useForm()
    const getInputForm = (data:any) => {
        reset();
        postData(data)
        ResolveData(setDbData,setKeys)
    }

    return(
        <>
        <div className="p-[20px] flex flex-col">
            <div className="w-full flex justify-center">
                <span>Таблица данных</span>
            </div>
            <span>Хотите добавить данные?</span>
            <div className="flex gap-[20px]">
                {keys ? 
                <form onSubmit={handleSubmit(getInputForm)} className="w-full flex flex-col gap-[20px]">
                    <div className="flex flex-wrap gap-[10px]">
                        {keys.map((item) => (
                            <div className="flex w-[100px] flex-col gap-[2.5px]">
                                <input {...register(item)} name={item} className="border px-[10px] rounded" placeholder={item} type="text" />
                            </div>
                        ))}
                    </div>
                    <button className="border cursor-pointer rounded bg-black hover:bg-white hover:text-black w-fit px-[10px]">Добавить данные</button>
                </form>
                : ""}
            </div>
            <div className="mt-[20px]">
                <TableData dbData={dbData}></TableData>
            </div>
        </div>
        </>
    )
}

export default MainPage;