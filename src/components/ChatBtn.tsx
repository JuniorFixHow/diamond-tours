import { MdOutlineMessage } from "react-icons/md";
import { ShowChatProps } from "./Chat";
const ChatBtn = ({showChat, setShowChat}:ShowChatProps) => {
  const showStyle = "cursor-pointer items-center flex flex-col fixed bottom-16 md:bottom-6 right-8";
  return (
    <div onClick={()=>setShowChat(true)} className={showChat? 'hidden':showStyle} >
        <MdOutlineMessage className="text-[#CB4900] hover:text-orange-400 text-4xl sm:text-4xl" />
        <span className="hidden sm:block text-black text-xl font-semibold" >Chat With Us</span>
    </div>
  )
}

export default ChatBtn