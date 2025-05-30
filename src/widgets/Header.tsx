import { useEffect, useState } from "react";
import { useThemeStore } from "../store/theme-store";
import moon_white from '/src/assets/icons/moon-white.svg'
import black_sun from "/src/assets/icons/sun-black.svg"

function Header(){
  const toggle = useThemeStore((value) => value.toggleTheme)
  const isBlackTheme = useThemeStore((value) => value.isBlack )
  const [isMounting,setIsMounting] = useState(false)
  const [startAnimState,setStartAnimState] = useState(false);
  useEffect(() => {
    if(isMounting){
      setStartAnimState(true);
      setTimeout(() => {
        setStartAnimState(false)
      },300)
    }
    else{
      setIsMounting(true)
    }
  },[isBlackTheme])
    return(
        <>
        <div className="w-full flex justify-between lg:justify-center relative">
          <span className={`text-[20px] lg:text-[36px] transition-all duration-500 text-shadow-lg ${isBlackTheme ? "text-shadow-blue-400" : "text-shadow-amber-200"} w-fit h-fit`}>Таблица данных</span>
          <button onClick={toggle} className={`absolute border h-[40px] lg:h-[50px] 
                      w-[100px] lg:w-[125px] right-0 transition-all duration-500 rounded-[30px]`} 
                      style={{borderColor:`${isBlackTheme ? "white" : "black"}`}}>
            <div className={`h-full relative transition-all duration-500 
              w-[40px] lg:w-[50px] flex justify-center items-center bg-${isBlackTheme ? "white" : "black"} rounded-[50%]`} style={{transform:`translateX(${isBlackTheme ? "0" : "150"}%)`}}>
                <img className={`w-[45px] transition-all hover:rotate-360 not-hover:duration-2000 hover:duration-2000 duration-300 ${startAnimState ? "opacity-0" : "opacity-100"}`} src={isBlackTheme? black_sun : moon_white} alt="" />
              </div>
          </button>
        </div>
        </>
    )
}

export default Header;