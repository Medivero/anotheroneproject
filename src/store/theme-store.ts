import { create } from "zustand";
import { persist} from 'zustand/middleware'

type themeStoreType = {
    isBlack:boolean,
    toggleTheme: () => void,
};

export const useThemeStore = create<themeStoreType>()(
    persist(
        (set,get) => ({
            isBlack: false,
            toggleTheme: () => {
                const newValueOfTheme = !get().isBlack;
                set({isBlack: newValueOfTheme})
            }
        }),
        {
            name: "dark-mode"
        }
    )
)
    