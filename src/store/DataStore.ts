import { create } from "zustand";
import { getData } from "../services/getData";

interface DataStore{
    dbData:any[],
    keys:string[],
    setDbData: (data:any) => void,
    setKeys: (keys:string[]) => void
    resolveData: () => void
}

export const useDataStore = create<DataStore>()((set) => ({
    dbData: [],
    keys: [],

    setDbData: async(data:any[]) => {
        set({dbData: data});
    },

    setKeys: async(keys:any[]) => {
        set({keys:keys})
    },

    resolveData: async () => {
        const data = await getData();
        set({
            dbData:data,
            keys: Array.from(new Set(data.flatMap((obj:any) => Object.keys(obj)))) 
        })
    }
}))