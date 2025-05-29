import { useForm } from "react-hook-form";
import { useDataStore } from "../../store/DataStore";
import { deleteColumnFromBd } from "../../services/deleteColumn";
import { useEffect, useState } from "react";

function DeleteColumnComponent(){
    const {keys,resolveData} = useDataStore();
    const FormSelect = useForm()
    const [newKeys,setNewKeys] = useState<string[]>([])
    useEffect(() => {
        const tempkeys = keys.filter((item) => item !== "id");
        setNewKeys(tempkeys);
    },[keys])
    const getSelectedColumn = async (data:any) => {
        const key = data["selectsomething"]
        await deleteColumnFromBd(key)
        await resolveData();
    }

    return (
        <>
        <div className="flex flex-col">
            <span>Хотите удалить колонку?</span>
            {newKeys ? 
            <form onSubmit={FormSelect.handleSubmit(getSelectedColumn)} className="flex flex-col gap-[20px]">
                <select {...FormSelect.register("selectsomething",{required:true})} className="border rounded">
                    {newKeys.map((item) => (
                        <option className={`${item === "id" ? "hidden" : ""}`} key={item} value={item}>{item}</option>
                    ))}
                </select>
                <button type="submit" className="border rounded w-[150px]">Удалить колонку</button>
            </form>
            : <span>Загрузка селектора</span>}
        </div>
        </>
    )
}

export default DeleteColumnComponent;