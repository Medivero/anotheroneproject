import { useThemeStore } from "../store/theme-store";

function Header(){
  const toggle = useThemeStore((value) => value.toggleTheme)
  const isBlackTheme = useThemeStore((value) => value.isBlack )
    return(
        <>
        <div className="w-full flex justify-between lg:justify-center relative">
          <span className="text-[20px] lg:text-[36px]">Таблица данных</span>
          <button onClick={toggle} className={`absolute border h-[40px] lg:h-[50px] 
                      w-[100px] lg:w-[125px] right-0 transition-all duration-500 rounded-[30px]`} 
                      style={{borderColor:`${isBlackTheme ? "white" : "black"}`}}>
            <div className={`h-full relative transition-all duration-500 
              w-[40px] lg:w-[50px] bg-${isBlackTheme ? "white" : "black"} rounded-[50%]`} style={{transform:`translateX(${isBlackTheme ? "0" : "150"}%)`}}></div>
          </button>
        </div>
        </>
    )
}

export default Header;