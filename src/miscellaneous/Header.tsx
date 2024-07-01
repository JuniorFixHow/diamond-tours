import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BiLogOutCircle } from "react-icons/bi";
// import { BsFillBellFill } from "react-icons/bs";

type HeaderProp ={
    newsButton:boolean,
    setCurrentPage?:React.Dispatch<React.SetStateAction<string>>
}
const Header = ({newsButton, setCurrentPage}:HeaderProp) => {
    const {dispatch} = useContext(AuthContext);
    const logout = ()=>{
        dispatch({type:'LOGOUT'});
    }
  return (
    <div className='w-5/6 px-8 py-2 flex flex-row justify-between items-center bg-white shadow-xl rounded-full mt-8' >
        <div className="flex flex-row items-center justify-center gap-4">
            <img src="/imgs/logo.png" alt="logo" className='w-9 h-9' />
            <div className='w-[1px] h-9 bg-[#cb4900]' ></div>
            <small className='text-black text-xs' >Tour with Bliss</small>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
            {
                newsButton &&
                <button type='button' onClick={()=> setCurrentPage && setCurrentPage('news')} className='hidden md:block bg-[#cb4900] py-[0.2rem] px-2 rounded-lg hover:bg-orange-300 text-white text-[0.8rem]' >Send Newsletter</button>
            }
            <BiLogOutCircle className='cursor-pointer' onClick={logout} color="#cb4900" />
        </div>
    </div>
  )
}

export default Header