import { useThemeStore } from "../store/theme-store";
import githubcatwhite from "/src/assets/icons/github-mark.png"
import githubcatblack from "/src/assets/icons/github-mark-white.png"


function Footer(){
    const isBlackTheme = useThemeStore((value) => value.isBlack )
    
    return (
        <>
        <div className="w-full h-[100px] flex justify-center items-center relative">
            <span>Приложение создано Medivero</span>
            <a href="https://github.com/Medivero" className="absolute right-0">
                <img className="w-[50px] lg:w-[100px]" src={isBlackTheme? githubcatblack : githubcatwhite}></img>
            </a>
        </div>
        </>
    )
}

export default Footer;