import { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window"; 
import "react-virtualized/styles.css";

export default function TableData({ dbData }: { dbData: any[] }) {
  const [allKeys, setAllKeys] = useState<string[]>([]);

  useEffect(() => {
    if (dbData) {
      setAllKeys(
        Array.from(new Set(dbData.flatMap((obj) => Object.keys(obj))))
      );
    }
  }, [dbData]);

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
            className="text-[10px]"
            style={ { flex: 1, padding: "5px", borderRight: "1px solid",wordBreak:"break-word" }}
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
        className="bg-black"
        style={{
          display: "flex",
          borderBottom: "2px solid",
        }}
      >
        {allKeys.map((key) => (
          <div
            key={key}
            className="text-[10px]"
            style={{ flex: 1, padding: "5px", borderRight: "1px solid",wordBreak:"break-word" }}
          >
            {key}
          </div>
        ))}
      </div>
      <List className="no-scrollbar bg-black" height={400} itemCount={dbData.length} itemSize={50} width="100%">
        {Row}
      </List>
    </div>
  );
}
