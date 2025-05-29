import { useForm } from "react-hook-form";
import { useThemeStore } from "../../store/theme-store";
import { useDataStore } from "../../store/DataStore";

function NewPoleComponent(){
    const {keys,setKeys} = useDataStore() 
    const isBlackTheme = useThemeStore((value) => value.isBlack )
    const formPole = useForm();
    const getNewPole = (data: any) => {
        formPole.reset();
        const pole = String(data["pole"]);
        let newKeys = [...keys];
        newKeys.push(pole);
        setKeys(newKeys)
        
    };
    return(
        <>
        <div className="flex flex-col">
            <span>Добавить новое поле? </span>
            <form
              onSubmit={formPole.handleSubmit(getNewPole)}
              className="flex flex-col gap-[10px]"
            >
              <input
                {...formPole.register("pole")}
                className="border px-[10px] max-w-[300px] placeholder:text-gray-500"
                type="text"
                required
                placeholder="Новое поле"
              />
              <button className={`w-fit border
              disabled:text-gray-600 disabled:cursor-not-allowed 
              rounded cursor-pointer hover:bg-${isBlackTheme ? "white" : "black"} hover:text-${isBlackTheme ? "black" : "white"} px-[20px]`}>
                Добавить новое поле
              </button>
            </form>
          </div>
        </>
    )
}

export default NewPoleComponent;