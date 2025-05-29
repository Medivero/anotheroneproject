import { create } from "zustand";
import { getData } from "../services/getData";

interface DataStore{
    dbData:any[],
    keys:string[],
    flagToScroll:boolean,
    setFlag:() => void,
    setDbData: (data:any) => void,
    setKeys: (keys:string[]) => void
    resolveData: () => void
}

export const useDataStore = create<DataStore>()((set) => ({
    dbData: [],
    keys: [],
    flagToScroll: false,
    setDbData: async(data:any[]) => {
        set({dbData: data});
    },

    setKeys: async(keys:any[]) => {
        set({keys:keys})
    },
    setFlag: async() => {
        set({flagToScroll:true});
        setTimeout(() => {
            set({flagToScroll:false})
        },500)
    },
    resolveData: async () => {
        const data = await getData();
        set({
            dbData:data,
            keys: Array.from(new Set(data.flatMap((obj:any) => Object.keys(obj))))
        })
    }
}))