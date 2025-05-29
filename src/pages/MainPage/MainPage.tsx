import { useEffect, useState } from "react";
import TableData from "../../widgets/table";
import Header from "../../widgets/Header";
import Footer from "../../widgets/Footer";
import NewPoleComponent from "./newPole";
import DeleteDataComponent from "./deleteData";
//@ts-ignore
import { useTypeNamesLikeAKeyboard } from "modulefortypetext/typetext.jsx";
import { useThemeStore } from "../../store/theme-store";
import { useDataStore } from "../../store/DataStore";
import NewDataComponent from "./addNewData";

const textforAddData = ["Хотите добавить данные?", "Введите их в ячейки"];

function MainPage() {
  const isBlackTheme = useThemeStore((value) => value.isBlack);
  const { dbData, resolveData } = useDataStore();
  const [spanAddData, setSpanAddData] = useState("");
  const [stateOptionalFunctions, setStateOpFunctions] = useState(true);

  useEffect(() => {
    resolveData();
  }, []);

  useTypeNamesLikeAKeyboard(textforAddData, setSpanAddData, 100); // собственный npm модуль. тут первое это массив с текстом, второе это сеттер состояния и третье интервал

  return (
    <>
      <div className="p-[20px] flex flex-col gap-[20px]">
        <Header></Header>
        <div className="border-b"></div>
        <span className="h-[20px]">{spanAddData}</span>
        <NewDataComponent></NewDataComponent>
        <div className="border-b"></div>
        <div className="flex flex-col gap-[20px] transition-all duration-500">
          <div
            className={`flex gap-[50px] transition-[max-height] duration-1000 flex-wrap overflow-hidden  ${
              stateOptionalFunctions ? "max-h-[0px]" : "max-h-[300px]"
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
