import { useState } from "react";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import MobileMenu from "./MobileMenu";
import { HeaderData } from "../data/LocalData";
// import IMAGE from '../../public/imgs/photo_6028099600981803407_y-removebg-preview.png';
// import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { Alert } from "@mui/material";

import { useAuth } from "../hooks/useAuth";
import LoginBtn from "../misc/LoginBtn";

type HeaderProps ={
  title:string,
  link: string
}

const Header = () => {
  const [showMenu, setShowMenu] = useState<string>('hidden');
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const headerStyle = "dark:text-white hover:text-slate-300 cursor-pointer";
  const selectedHeaderStyle = "text-slate-300 cursor-pointer";
  const [showError, setShowError] = useState<boolean>(false);
  const {user} = useAuth();

  // console.log(user);
  const handleTitle = (t:string)=>{
    if(!user && t === 'Bookings'){
      setShowError(true);
    }else{
      setCurrentTitle(t);
      setShowError(false);
    }
  }
  

  return (
    <header id="header" className="w-full flex items-center mx-auto py-2 justify-center font-semibold bg-[#676161] sticky top-0" >
      {
        showError &&
        <Alert onClose={()=>setShowError(false)} className="fixed top-16 self-center w-5/6 lg:w-1/2" severity='error' variant='standard' >Please sign in to see your appointments</Alert>
      }
        <MobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        <div className="w-5/6 flex flex-row justify-between items-center">
            <div className="flex gap-2 flex-row items-center justify-center">
            <a href="#hero" className="flex flex-row items-center justify-center" >
            <img src='/imgs/photo_6028099600981803407_y-removebg-preview.png' className="h-10 w-10 object-cover cursor-pointer" alt="" />
            <div className="hidden sm:block w-[1px] h-10 bg-[#CB4900]" ></div>
              <span className="text-sm text-black cursor-pointer">Tour With Bliss</span>
            </a>
            </div>
            <div className="hidden lg:flex flex-row justify-center text-sm text-black gap-6">
              {
                HeaderData.map((item:HeaderProps)=>(
                  <a onClick={()=>handleTitle(item.title)} key={item.title} href={item.link}>
                    <span className={currentTitle === item.title?selectedHeaderStyle:headerStyle} >{item.title}</span>
                  </a>
                ))
              }
                
            </div>
            <div className="gap-6 flex-row justify-center hidden md:flex">
              <div className="rounded-2xl flex items-center justify-center cursor-pointer hover:bg-slate-300 border border-black bg-white text-black px-4 py-2">
                <MdOutlinePhoneAndroid size={15} />
                <span className=" text-[0.5rem] sm:text-sm " >Get App</span>
              </div>
              <LoginBtn showLogout={showLogout} setShowLogout={setShowLogout} logo />
              {/* <SignedOut> */}
              {/* <div className="rounded-2xl bg-[#CB4900] hover:bg-orange-300 text-white text-[0.5rem] sm:text-sm px-4 py-2 cursor-pointer "> */}
                {/* <span>Register</span> */}
                  {/* <SignInButton /> */}
              {/* </div> */}
                {/* </SignedOut> */}
              {/* <SignedIn>
                <UserButton />
              </SignedIn> */}
            </div>
            <button onClick={()=>setShowMenu('flex')} className="text-white text-3xl lg:hidden block cursor-pointer">&#9776;</button>
        </div>
    </header>
  )
}

export default Header