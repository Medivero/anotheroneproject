import { useEffect, useState } from "react";
import TableData from "../../widgets/table";
import { SubmitHandler, useForm } from "react-hook-form";
import { postData } from "../../services/postData";
import Header from "../../widgets/Header";
import Footer from "../../widgets/Footer";
import NewPoleComponent from "./newPole";
import DeleteDataComponent from "./deleteData";
//@ts-ignore
import { useTypeNamesLikeAKeyboard } from "modulefortypetext/typetext.jsx";
import { useThemeStore } from "../../store/theme-store";
import { useDataStore } from "../../store/DataStore";

const textforAddData = ["Хотите добавить данные?", "Введите их в ячейки"];

function MainPage() {
  const isBlackTheme = useThemeStore((value) => value.isBlack);
  const { dbData, keys, resolveData } = useDataStore();
  const [spanAddData, setSpanAddData] = useState("");
  const [AddDataRequset, setAddDataRequset] = useState(false);
  const [stateOptionalFunctions, setStateOpFunctions] = useState(true);

  const formNewData = useForm();

  useEffect(() => {
    resolveData();
  }, []);

  useTypeNamesLikeAKeyboard(textforAddData, setSpanAddData, 100); // собственный npm модуль. тут первое это массив с текстом, второе это сеттер состояния и третье интервал

  const getInputForm: SubmitHandler<any> = async (data) => {
    setAddDataRequset(true);
    let newobj: any = {};
    const lastId = dbData[dbData.length - 1]["id"];
    for (const key in data) {
      if (data[key] !== "" && data[key] !== " ") {
        newobj[key] = data[key];
      }
    }
    if (Object.keys(data).length === 0) {
      setAddDataRequset(false);
      return;
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
      await resolveData();
      formNewData.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setAddDataRequset(false);
    }
  };
  return (
    <>
      <div className="p-[20px] flex flex-col gap-[20px]">
        <Header></Header>
        <div className="border-b"></div>
        <span className="h-[20px]">{spanAddData}</span>
        <div className="flex gap-[20px]">
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
        <div className="border-b"></div>
        <div className="flex flex-col gap-[20px] transition-all duration-500">
          <div
            className={`flex gap-[50px] transition-[max-height] duration-500 overflow-hidden  ${
              stateOptionalFunctions ? "max-h-[0px]" : "max-h-[100px]"
            }`}
          >
            <NewPoleComponent></NewPoleComponent>
            <DeleteDataComponent></DeleteDataComponent>
          </div>
          <button
            onClick={() => setStateOpFunctions(!stateOptionalFunctions)}
            className={`border rounded cursor-pointer ${
              isBlackTheme
                ? "hover:bg-white hover:text-black"
                : "hover:bg-black hover:text-white"
            } w-fit px-[10px]`}
          >
            {!stateOptionalFunctions
              ? "Закрыть доп. функции"
              : "Открыть доп.функции"}
          </button>
        </div>
        <div className="border-b "></div>
        <div className="lg:p-[10px] rounded-lg">
          {dbData ? (
            <TableData dbData={dbData}></TableData>
          ) : (
            <span>Загрузка данных</span>
          )}
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default MainPage;
