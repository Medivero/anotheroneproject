import { useForm } from "react-hook-form";
import { useThemeStore } from "../../store/theme-store";
import { useEffect, useState } from "react";
import { useDataStore } from "../../store/DataStore";
import { deleteDataById } from "../../services/deleteData";

function DeleteDataComponent() {
  const isBlackTheme = useThemeStore((value) => value.isBlack);
  const [responseState, setResponseState] = useState("");
  const {resolveData} = useDataStore();
  const [errorState, setErrorState] = useState(false);
  const [ismounted, setismounted] = useState(false);
  const [blockButton,setBlockButton] = useState(false)
  const formId = useForm();
  const getInputForm = async (data: any) => {
    setBlockButton(true);
    formId.reset();
    const id = String(data["id"]);
    const res:any = await deleteDataById(id)
    if (!res.ok){
      setResponseState(res)
    }
    try{
      await resolveData();
    } catch(error){
      console.error(error)
    }
    finally{
      setTimeout(() => {
        setBlockButton(false)
      },1000)
    }
  };
  useEffect(() => {
    if (ismounted) {
        setErrorState(true)
        setTimeout(() => {
            setErrorState(false)
        },3000)
    }
    else{
        setismounted(true)
    }
  }, [responseState]);
  return (
    <>
      <div className="flex flex-col">
        <span className="tuffy-bold text-[20px]">Может удалить какую-то запись?</span>
        <form
          onSubmit={formId.handleSubmit(getInputForm)}
          className="flex flex-col gap-[10px]"
        >
          <input
            type="number"
            {...formId.register("id",{required:true,validate:(value) => !/[+-]/.test(value)},)}
            placeholder="Id"
            
            className="border px-[10px] w-[200px] placeholder:text-gray-500"
          ></input>
          <div className="flex gap-[20px]">
            <button
              type="submit" disabled={blockButton} className={`w-fit border
                
                        disabled:text-gray-600 disabled:cursor-not-allowed 
                        rounded cursor-pointer hover:bg-${
                          isBlackTheme ? "white" : "black"
                        } hover:text-${
                isBlackTheme ? "black" : "white"
              } px-[20px]`}
            >
              Удалить запись по ID
            </button>
            <div
              className={`transition-all duration-500
                        ${
                          isBlackTheme
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        } rounded flex items-center justify-center flex-nowrap whitespace-nowrap  overflow-hidden h-[20px] 
                        ${
                          errorState
                            ? "max-w-[400px] px-[5px] "
                            : "max-w-[0px] px-[0px]"
                        }`}
            >
              <span>Something went wrong</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default DeleteDataComponent;
