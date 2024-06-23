import { ChatData } from "../data/LocalData"
import { IoTrashBinOutline } from "react-icons/io5";
import { IoMdPaperPlane } from "react-icons/io";

type ChatProps = {
    id:number,
    text:string,
    time:string,
    sent:boolean
}

export type ShowChatProps = {
    showChat:boolean,
    setShowChat: React.Dispatch<React.SetStateAction<boolean>>
}

const Chat = ({showChat, setShowChat}:ShowChatProps) => {
    const sentStyle = "bg-black w-full p-2 text-white rounded-xl";
    const receivedStyle = "bg-white w-full p-2 text-black rounded-xl";
    const sentAlign = "flex w-[90%] flex-col self-end";
    const receivedAlign = "flex w-[90%] flex-col";
    const chatStyle = "w-80 md:w-[30rem] py-8 px-4 flex-col bg-slate-700 h-[30rem] bottom-24 right-2 md:right-8 rounded-2xl fixed z-10 justify-between flex";
  return (
    <div className={showChat? chatStyle : 'hidden'}>
        <button onClick={()=>setShowChat(false)} className="absolute text-4xl right-2 top-0 cursor-pointer text-red-500 rounded-full hover:text-red-300" >&times;</button>
        <div className="flex flex-row gap-4 items-center justify-center">
            <img src="/imgs/9187604.png" className="w-6 h-6 rounded-full" alt="" />
            <h2 className="font-bold text-white text-[1rem] text-left w-full">Live Chat with <span className="text-[#e7854b]">Dimaond Tours</span></h2>
        </div>
        <div className="flex flex-col w-full h-3/4 overflow-y-scroll overflow-x-hidden mt-4 gap-4 md:gap-6 border border-slate-400 py-2 px-1">
        {
            ChatData.sort((a, b)=>new Date(a.time) > new Date(b.time) ? 1:-1).map((chat:ChatProps)=>(
                <div key={chat.id} className={chat.sent?sentAlign:receivedAlign}>
                    <div className={chat.sent ? sentStyle:receivedStyle}>
                        <p className="text-[0.8rem]" >{chat.text}</p>
                    </div>
                    <div className="flex flex-row justify-center items-row self-end gap-8 mt-1">
                        <IoTrashBinOutline className="cursor-pointer" size={20} color="tomato" />
                        <small className="text-[0.8rem] text-slate-300" >{chat.time}</small>
                    </div>
                </div>
            ))
        }
        </div>
        <div className="w-full items-center justify-between flex flex-row bg-[#d9d9d9] rounded-full bottom-4 self-center">
            <textarea rows={1} placeholder="type here" className="outline-none px-4 py-2 border-none rounded-full bg-[#d9d9d9] w-5/6" />
            <div className="flex items-center justify-center p-4 hover:bg-orange-400 bg-[#cb4900] rounded-full cursor-pointer">
                <IoMdPaperPlane size={20} color="white" />
            </div>
        </div>
    </div>
  )
}

export default Chat