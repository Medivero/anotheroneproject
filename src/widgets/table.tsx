import { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window"; 
import "react-virtualized/styles.css";

export default function TableData({ dbData }: { dbData: any[] }) {
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [textSizeState,setTextSizeState] = useState(0);
  

  useEffect(() => {
    if (dbData) {
      setAllKeys(
        Array.from(new Set(dbData.flatMap((obj) => Object.keys(obj))))
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
            className={` lg:p-[5px]`}
            style={ {fontSize: textSizeState,flex: 1, borderRight: "1px solid",wordBreak:"break-word" }}
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
            className={`lg:p-[5px]`}
            style={{ fontSize: textSizeState, flex: 1, borderRight: "1px solid",wordBreak:"break-word" }}
          >
            {key}
          </div>
        ))}
      </div>
      <List className="no-scrollbar" height={400} itemCount={dbData.length} itemSize={50} width="100%">
        {Row}
      </List>
    </div>
  );
}
