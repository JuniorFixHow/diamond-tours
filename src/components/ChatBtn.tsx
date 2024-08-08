import { MdOutlineMessage } from "react-icons/md";
import { ShowChatProps } from "./Chat";
import { useState } from "react";
import { Alert } from "@mui/material";
const ChatBtn = ({showChat, setShowChat}:ShowChatProps) => {
  const [showError, setShowError] = useState<boolean>(false);
  const showStyle = "cursor-pointer items-center flex flex-col fixed bottom-16 md:bottom-6 right-8";

  const user = '123';

  const handleBtnPress = ()=>{
    if(!user){
      setShowError(true);
    }else{
      setShowChat(true);
      setShowError(false);
    }
  }

  if(showError) return <Alert onClose={()=>setShowError(false)} className="fixed top-16 self-center left-10 lg:left-60 w-5/6 lg:w-1/2" severity='error' variant='standard' >Please sign in access live chat</Alert>
  
  return (
    <div onClick={handleBtnPress} className={showChat? 'hidden':showStyle} >
      {
      }
        <MdOutlineMessage className="text-[#CB4900] hover:text-orange-400 text-4xl sm:text-4xl" />
        <span className="hidden sm:block text-black text-xl font-semibold" >Chat With Us</span>
    </div>
  )
}

export default ChatBtn