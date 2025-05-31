import { Suspense, useEffect, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { getData } from "../../services/getData";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  city: string;
  position: string;
  company: string;
  status: string;
  registered: string;
};

export default function TableData() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<User[]>([]);
  const [fields, setFields] = useState<(keyof User)[]>([]);
  const [totalLength, setTotalLength] = useState(0);
  const [isloading, setLoading] = useState(false);

  async function requestData() {
    if (isloading) return;
    setLoading(true);
    const dataAfterRequest = await getData(page);
    setData((prev) => [...prev, ...dataAfterRequest?.data]);
    if (fields.length === 0 && dataAfterRequest?.data?.length > 0) {
      setFields(Object.keys(dataAfterRequest.data[dataAfterRequest.data.length-1]) as (keyof User)[]);
    }
    setPage((prev) => prev + 1);
    setTotalLength(dataAfterRequest?.items ?? 0);
    setLoading(false);
  }

  useEffect(() => {
    requestData();
  }, []);

  return (
    <>
      <div className="h-[800px]">
        <TableVirtuoso
          data={data}
          endReached={() => {
            if (data.length < totalLength && !isloading) {
              requestData();
            }
          }}
          fixedHeaderContent={() => (
            <tr>
              {fields.map((item) => (

                <th
                  key={item}
                  className={`${
                    item === "id" || item === "age"
                    ? "w-[50px]"
                    : "min-w-[100px]"
                  } border h-[50px] bg-white text-black`}
                  >
                  {item}
                </th>
              ))}
            </tr>
          )}
          itemContent={(_, row) => (
            <>
              {fields.map((item) => (
                
                <td className="border text-center py-[20px]" key={item}>
                  <Suspense fallback="loading">
                    {typeof row[item] === "object"
                      ? JSON.stringify(row[item])
                      : String(row[item])}
                    </Suspense>
                </td>
                
              ))}
            </>
          )}
          components={{
            Table: (props) => (
              <table {...props} className=" w-full" />
            ),
            TableRow: ({ children, ...rest }) => (
              <tr {...rest}>{children}</tr>
            ),
            TableBody: (props) => <tbody {...props} />,
          }}
        />
      </div>
    </>
  );
}