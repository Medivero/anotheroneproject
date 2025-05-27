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
            style={{ flex: 1, padding: "10px", borderRight: "1px solid" }}
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
        className=""
        style={{
          display: "flex",
          borderBottom: "2px solid",
        }}
      >
        {allKeys.map((key) => (
          <div
            key={key}
            style={{ flex: 1, padding: "12px", borderRight: "2px solid" }}
          >
            {key}
          </div>
        ))}
      </div>
      <List height={400} itemCount={dbData.length} itemSize={50} width="100%">
        {Row}
      </List>
    </div>
  );
}
