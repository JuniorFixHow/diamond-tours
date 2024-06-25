import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { Alert } from "@mui/material";
import { useState } from "react";
import { MdOutlinePhoneAndroid } from "react-icons/md";

type menuProps = {
  showMenu:string,
  setShowMenu:React.Dispatch<React.SetStateAction<string>>
}
const MobileMenu = ({showMenu, setShowMenu}:menuProps) =>{
  const [showError, setShowError] = useState<boolean>(false);
  const {isSignedIn} = useAuth();
  const handleBooking = ()=>{
    if(!isSignedIn){
      setShowError(true);
      setShowMenu('hidden')
    }else{
      setShowError(false);
      setShowMenu('hidden')
    }
  }
  const menulass = "flex-col absolute top-0 bg-[#676161] w-full text-5xl justify-center origin-top animate-open-menu " + showMenu;

  if(showError) return <Alert onClose={()=>setShowError(false)} className="fixed top-16 self-center left-8 lg:left-80 w-5/6 lg:w-1/2" severity='error' variant='standard' >Please sign in to see your appointments</Alert>

return (
  <section onClick={()=>setShowMenu('hidden')} className={menulass} id="mobile-menu" >
      <button onClick={()=>setShowMenu('hidden')} className="text-6xl self-end px-6">&times;</button>
      <nav className="flex flex-col min-h-screen w-full items-center py-4" aria-label="mobile" >
          <a onClick={()=>setShowMenu('hidden')} href="#hero" className="w-full text-center text-2xl py-2 hover:opacity-90 text-white" >Home</a>
          <a onClick={()=>setShowMenu('hidden')} href="#services" className="w-full text-center text-2xl py-2 hover:opacity-90 text-white" >Services</a>
          <a onClick={()=>setShowMenu('hidden')} href="#packages" className="w-full text-center text-2xl py-2 hover:opacity-90 text-white" >Packages</a>
          <a onClick={handleBooking} href="#bookings" className="w-full text-center text-2xl py-2 hover:opacity-90 text-white" >Bookings</a>
          <a onClick={()=>setShowMenu('hidden')} href="#about" className="w-full text-center text-2xl py-2 hover:opacity-90 text-white" >About Us</a>
          <a onClick={()=>setShowMenu('hidden')} href="#contact" className="w-full text-center text-2xl py-2 hover:opacity-90 text-white" >Contact Us</a>
          <a onClick={()=>setShowMenu('hidden')} href="#footer" className="w-full text-center text-2xl py-2 hover:opacity-90 text-white" >Legal</a>
          <div className="gap-6 flex-col flex justify-center md:hidden w-full items-center">
              <div className="rounded-2xl w-1/2 flex items-center justify-center cursor-pointer hover:bg-slate-300 border border-black bg-white text-black px-4 py-2">
                <MdOutlinePhoneAndroid size={25} />
                <span className=" text-xl" >Get App</span>
              </div>
              <SignedOut>
              <div className="rounded-2xl w-1/2 bg-[#CB4900] flex items-center justify-center hover:bg-orange-300 text-white text-xl px-4 py-2 cursor-pointer ">
                {/* <span>Register</span> */}
                  <SignInButton />
              </div>
                </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              {/* <div className="rounded-2xl w-1/2 flex items-center justify-center bg-[#CB4900] hover:bg-orange-300 text-white text-[0.5rem] sm:text-sm px-4 py-2 cursor-pointer ">
                <span className="text-xl" >Register</span>
              </div> */}
            </div>
      </nav>
  </section>
)
}

export default MobileMenu