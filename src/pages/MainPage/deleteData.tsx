import { useForm } from "react-hook-form";
import { useThemeStore } from "../../store/theme-store";
import deleteDataById from "../../services/deleteData";

function DeleteDataComponent(){
    const isBlackTheme = useThemeStore((value) => value.isBlack )
    const formId = useForm();
    const getInputForm = (data:any) => {
        formId.reset();
        const id = String(data["id"]);
        deleteDataById((id))
    }
    return (
        <>
        <div className="flex flex-col">
            <span>Может удалить какую-то запись?</span>
            <form onSubmit={formId.handleSubmit(getInputForm)} className="flex flex-col gap-[10px]">
                <input required type="number" {...formId.register("id")} placeholder="Id" className="border px-[10px] max-w-[300px] placeholder:text-gray-500"></input>
                <button className={`w-fit border
              disabled:text-gray-600 disabled:cursor-not-allowed 
              rounded cursor-pointer hover:bg-${isBlackTheme ? "white" : "black"} hover:text-${isBlackTheme ? "black" : "white"} px-[20px]`}>
                Удалить запись по ID
              </button>
            </form>
        </div>
        </>
    )
}

export default DeleteDataComponent;