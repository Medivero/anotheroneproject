import { useForm } from "react-hook-form";
import { useDataStore } from "../../store/DataStore";
import { deleteColumnFromBd } from "../../services/deleteColumn";
import { useEffect, useState } from "react";
import { useThemeStore } from "../../store/theme-store";

function DeleteColumnComponent(){
    const isBlackTheme = useThemeStore((value) => value.isBlack);
    const [blockButton,setBlockButton] = useState(false);
    const {keys,resolveData} = useDataStore();
    const FormSelect = useForm()
    const [newKeys,setNewKeys] = useState<string[]>([])
    useEffect(() => {
        const tempkeys = keys.filter((item) => item !== "id");
        setNewKeys(tempkeys);
    },[keys])
    const getSelectedColumn = async (data:any) => {
        setBlockButton(true)
        const key = data["selectsomething"]
        await deleteColumnFromBd(key)
        try{
            resolveData();
        } catch(error){
            console.log(error)
        }
        finally{
            setTimeout(() => {
                setBlockButton(false)
            },1000)
        }
    }

    return (
        <>
        <div className="flex flex-col">
            <span className="tuffy-bold text-[20px]">Хотите удалить колонку?</span>
            {newKeys ? 
            <form onSubmit={FormSelect.handleSubmit(getSelectedColumn)} className="flex flex-col gap-[10px]">
                <select {...FormSelect.register("selectsomething",{required:true})} className="border">
                    {newKeys.map((item) => (
                        <option className={`${item === "id" ? "hidden" : ""}`} key={item} value={item}>{item}</option>
                    ))}
                </select>
                <button disabled={blockButton} type="submit" className={`w-fit border
                        disabled:text-gray-600 disabled:cursor-not-allowed 
                        rounded cursor-pointer hover:bg-${
                          isBlackTheme ? "white" : "black"
                        } hover:text-${
                isBlackTheme ? "black" : "white"
              } px-[20px]`}>Удалить колонку</button>
            </form>
            : <span>Загрузка селектора</span>}
        </div>
        </>
    )
}

export default DeleteColumnComponent;