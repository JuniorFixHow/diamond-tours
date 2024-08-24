import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import { UserProps } from "../types/Types";
import { auth } from "../../firebase";
import { Dispatch, SetStateAction } from "react";

type LoginProps = {
    logo?:boolean,
    showLogout:boolean,
    setShowLogout?:Dispatch<SetStateAction <boolean>>
}
const LoginBtn = ({logo, showLogout, setShowLogout}:LoginProps) => {
    const {user, setUserData, logout} = useAuth();

    const handleGoogleSignin =async()=>{
        try {
          const provider = new GoogleAuthProvider();
        //   provider.setCustomParameters({ prompt: 'select_account', 'login_hint': 'Diamond Tours Ghana' });
          const res = await signInWithPopup(auth, provider);
          const data = res.user;
          console.log(data)
          // const credential = GoogleAuthProvider.credentialFromResult(res);
          const userData: UserProps={
            id:data.uid,
            photoURL:data.photoURL!,
            displayName:data.displayName!,
            phone: data.phoneNumber!,
            email:data.email!
          }
          setUserData(userData);
          setShowLogout!(false);
          // console.log(credential);
        } catch (error) {
          console.log(error);
        }
      
      }
  return (
    <>
        {
            user?
            <div className="flex flex-col items-center gap-4 relative">
                {
                    logo &&
                    <img src={user?.photoURL} onClick={()=>setShowLogout!(e=>!e)} className="w-10 h-10 cursor-pointer object-cover rounded-full" alt="user" />
                }
                <div className={`${showLogout?'flex':'hidden'} flex-col bg-white rounded-md z-10 absolute top-10 shadow-sm items-center justify-center p-2 gap-2`}>
                    <span onClick={logout} className="text-slate-600 text-[0.9rem] sm:text-[1rem] hover:text-slate-500 font-light cursor-pointer" >Logout</span>
                    {
                    logo &&
                    <span onClick={()=>setShowLogout!(false)} className="text-slate-600 text-[0.9rem] sm:text-[1rem] font-light hover:text-slate-500 cursor-pointer" >Close</span>
                    }
                </div>
            </div>
            :
            <div onClick={handleGoogleSignin} className="rounded-2xl bg-[#CB4900] hover:bg-orange-300 text-white text-[0.5rem] sm:text-sm px-4 py-2 cursor-pointer ">
                <span>Login</span>
            </div>
        }
    </>
  )
}

export default LoginBtn