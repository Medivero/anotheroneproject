import './App.css'
import MainPage from './pages/MainPage/MainPage'
import { useThemeStore } from './store/theme-store'

function App() {
  const isBlackTheme = useThemeStore((value) => value.isBlack )
  let classname = `${isBlackTheme ? "bg-black text-white" : "bg-white text-black"} 
  transition-all duration-1000 tuffy-regular`
  return (
    <>
    <div className={classname} >
      <MainPage></MainPage>
    </div>
    </>
  )
}

export default App
