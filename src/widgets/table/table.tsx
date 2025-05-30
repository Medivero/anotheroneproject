import { useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window"; 
import { useDataStore } from "../../store/DataStore";
import { useThemeStore } from "../../store/theme-store";

export default function TableData({ dbData }: { dbData: any[] }) {
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [textSizeState,setTextSizeState] = useState(0);
  const isBlackTheme = useThemeStore((value) => value.isBlack);
  const {flagToScroll} = useDataStore()
  const listRef = useRef<List>(null);
  const ScrollToBottom = () => {
    listRef.current?.scrollToItem(dbData.length-1)
  }

  useEffect(() => {
      ScrollToBottom()
  },[flagToScroll])

  useEffect(() => {
    if (dbData) {
      setAllKeys(
        Array.from(new Set(dbData.flatMap((obj) => Object.keys(obj)))).sort((a) => {
          return a === "id" ? -1 : 1
        })
      );
    }
  }, [dbData]);

  useEffect(() => {
    setTextSizeState(30-allKeys.length)
  },[allKeys])
  

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const row = dbData[index];
    return (
      <div style={{ ...style, display: "flex", borderBottom: "1px solid" }}>
        {allKeys.map((key) => (
          <div
            key={key}
            className={`lg:p-[5px] flex justify-center items-center transition-all duration-500 ${key==="id" ? (isBlackTheme ? "bg-gray-800 tuffy-bold" : "bg-amber-200 tuffy-bold") : ""}`}
            style={ {fontSize: textSizeState,flex: 1, borderRight: `${key === "id" ? "2px solid" : "1px solid" }`,wordBreak:"break-word" }}
          >
            {row[key]}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid",
        }}
      >
        {allKeys.map((key) => (
          <div
            key={key}
            className={`lg:p-[5px] flex justify-center transition-all duration-500 ${key === "id" ? "tuffy-bold" : ""} items-center ${isBlackTheme ? "bg-gray-800" : "bg-amber-200"}`}
            style={{ fontSize: textSizeState, flex: 1, borderRight: `${key === "id" ? "2px solid":'1px solid'}`,wordBreak:"break-word" }}
          >
            {key}
          </div>
        ))}
      </div>
      <List ref={listRef} className="no-scrollbar" height={400} itemCount={dbData.length} itemSize={50} width="100%">
        {Row}
      </List>
    </div>
  );
}
