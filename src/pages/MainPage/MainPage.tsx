import { useEffect, useState } from "react";
import { getData } from "../../services/getData";
import TableData from "../../widgets/table";
import { useForm } from "react-hook-form";
import postData from "../../services/postData";
import Header from "../../widgets/Header";
import Footer from "../../widgets/Footer";
import NewPoleComponent from "./newPole";
import DeleteDataComponent from "./deleteData";
//@ts-ignore
import { useTypeNamesLikeAKeyboard } from "modulefortypetext/typetext.jsx"

function ResolveData({setDbData, setKeys,setAddDataRequset}: {setDbData:Function,setKeys:Function,setAddDataRequset:Function}) {
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
  const textforAddData = ["Хотите добавить данные?", "Введите их в ячейки"]
  const [spanAddData,setSpanAddData] = useState('');
  const [dbData, setDbData] = useState([]);
  let [keys, setKeys] = useState<string[]>([]);
  const [AddDataRequset,setAddDataRequset] = useState(false);
    useTypeNamesLikeAKeyboard(textforAddData,setSpanAddData,100) // собственный npm модуль
  
  const formNewData = useForm();
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
        <div className="flex gap-[50px]">
          <NewPoleComponent keys={keys} setKeys={setKeys}></NewPoleComponent>
          <DeleteDataComponent></DeleteDataComponent>
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
