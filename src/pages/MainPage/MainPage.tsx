import { useEffect, useState } from "react";
import { getData } from "../../services/getData";
import TableData from "../../widgets/table";
import { useForm } from "react-hook-form";
import postData from "../../services/postData";
import Header from "../../widgets/Header";
import Footer from "../../widgets/Footer";
import { useThemeStore } from "../../store/theme-store";

function ResolveData({setDbData, setKeys,setAddDataRequset}: any) {
  getData()
    .then((data) => {
      setDbData(data);
      return data;
    })
    .then((data) => {
      setKeys(
        Array.from(new Set(data.flatMap((obj: String) => Object.keys(obj))))
      );
      setAddDataRequset(false)
    });
}

function MainPage() {
  const isBlackTheme = useThemeStore((value) => value.isBlack )
  const [dbData, setDbData] = useState([]);
  let [keys, setKeys] = useState<string[]>([]);
  const [AddDataRequset,setAddDataRequset] = useState(false);

  const formNewData = useForm();
  const formPole = useForm();

  useEffect(() => {
    ResolveData({setDbData,setKeys,setAddDataRequset});
  }, []);

  const getInputForm = (data: any) => {
    setAddDataRequset(false)
    formNewData.reset();
    let newobj: any = {};
    const lastId = dbData[dbData.length - 1]["id"];
    for (const key in data) {
      if (data[key] !== "" && data[key] !== " ") {
        newobj[key] = data[key];
      }
    }
    console.log(newobj);
    /**
     * По хорошему счетчиком ID должна заниматься база данных, но так как я работаю с json-server, то делаю это на клиенте.
     */
    newobj["id"] = String(Number(lastId) + 1);
    postData(newobj);
    ResolveData({setDbData,setKeys,setAddDataRequset});
  };

  const getNewPole = (data: any) => {
    formPole.reset();
    const pole = String(data["pole"]);
    let newKeys = [...keys];
    newKeys.push(pole);
    setKeys(newKeys);
  };

  return (
    <>
      <div className="p-[20px] flex flex-col gap-[20px]">
        <Header></Header>
        <div className="border-b"></div>
        <span>Хотите добавить данные? Введите их в ячейки</span>
        <div className="flex gap-[20px]">
          {keys ? (
            <form
              onSubmit={formNewData.handleSubmit(getInputForm)}
              className="w-full flex flex-col gap-[20px]"
            >
              <div className="flex flex-wrap gap-[10px]">
                {keys.map((item) => (
                  <div
                    key={item}
                    className={`${
                      item === "id" ? "hidden" : ""
                    } flex w-[100px] flex-col gap-[2.5px] `}
                  >
                    <input
                      {...formNewData.register(item)}
                      name={item}
                      className={`border px-[10px] rounded placeholder:text-gray-500`}
                      placeholder={item}
                      type="text"
                    />
                  </div>
                ))}
              </div>
              <button disabled={AddDataRequset} className="border
               disabled:text-gray-600 disabled:cursor-not-allowed 
               cursor-pointer rounded hover:bg-white hover:text-black w-fit px-[10px]">
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
        <div className="flex flex-col">
          <span>Добавить новое поле?</span>
          <form
            onSubmit={formPole.handleSubmit(getNewPole)}
            className="flex flex-col gap-[10px]"
          >
            <input
              {...formPole.register("pole")}
              className="border px-[10px] max-w-[300px] placeholder:text-gray-500"
              type="text"
              
              placeholder="Новое поле"
            />
            <button className={`w-fit border
             disabled:text-gray-600 disabled:cursor-not-allowed 
             rounded cursor-pointer hover:bg-${isBlackTheme ? "white" : "black"} hover:text-${isBlackTheme ? "black" : "white"} px-[20px]`}>
              Добавить новое поле
            </button>
          </form>
        </div>
        <div className="border-b "></div>
        <div className="lg:p-[10px] rounded-lg">
          {dbData ? 
          <TableData dbData={dbData}></TableData>
         : <span>Загрузка данных</span>}
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default MainPage;
