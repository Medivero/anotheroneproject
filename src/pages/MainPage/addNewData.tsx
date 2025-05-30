import { SubmitHandler, useForm } from "react-hook-form";
import { useDataStore } from "../../store/DataStore";
import { useState } from "react";
import { postData } from "../../services/postData";
import { useThemeStore } from "../../store/theme-store";

function NewDataComponent() {
  const [AddDataRequset, setAddDataRequset] = useState(false);
  const { dbData, keys, resolveData, setFlag } = useDataStore();
  const isBlackTheme = useThemeStore((value) => value.isBlack);
  const [checkBox,setCheckBox] = useState(false)

  const getInputForm: SubmitHandler<any> = async (data) => {
    setAddDataRequset(true);
    let newobj: any = {};
    const lastId = dbData[dbData.length - 1]["id"];
    for (const key in data) {
      if (data[key] !== "" && data[key] !== " ") {
        newobj[key] = data[key];
      }
    }
    if (Object.keys(newobj).length === 0) {
      setAddDataRequset(false);
      return;
    }
    if (checkBox){
      if (Object.keys(newobj).length < 6){
        alert(`Заполненных полей должно быть больше! ${Object.keys(newobj).length}/5`)
        return
      }
    }
    console.log(newobj);
    /**
     * По хорошему счетчиком ID должна заниматься база данных, но так как я работаю с json-server, то делаю это на клиенте.
     */
    if (lastId) {
      newobj["id"] = String(Number(lastId) + 1);
    } else {
      newobj["id"] = String(1);
    }
    try {
      await postData(newobj);
      resolveData();
      setFlag();
      formNewData.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setAddDataRequset(false); // вынужденный сетаймаут, чтобы показать что блокировка кнопка добавления блокируется.
      },1000)
    }
  };
  const formNewData = useForm();
  return (
    <>
      <div className="flex gap-[20px] flex-col items-start">
        <div className="flex gap-[10px]">
          <span>Ограничить на минимальное количество полей? (5)</span>
          <input className="w-[20px] h-[20px]" checked={checkBox} type="checkbox" onChange={() => setCheckBox(!checkBox)}></input>
        </div>
        {keys ? (
          <form
            onSubmit={formNewData.handleSubmit(getInputForm)}
            className="w-full flex flex-col gap-[20px]"
            noValidate
          >
            <div className="flex flex-wrap gap-[10px]">
              {keys.map((item: any) => (
                <input
                  {...formNewData.register(item)}
                  name={item}
                  key={item}
                  className={`border px-[10px] rounded placeholder:text-gray-500 ${
                    item === "id" ? "hidden" : ""
                  } w-[100px]`}
                  placeholder={item}
                  type="text"
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={AddDataRequset}
              className={`border
               disabled:text-gray-600 disabled:cursor-not-allowed 
               cursor-pointer rounded
               ${
                 isBlackTheme
                   ? "hover:bg-white hover:text-black"
                   : "hover:bg-black hover:text-white"
               } 
               w-fit px-[10px]`}
            >
              Добавить данные
            </button>
          </form>
        ) : (
          <>
            <div>Загрузка полей...</div>
          </>
        )}
      </div>
    </>
  );
}
export default NewDataComponent;
