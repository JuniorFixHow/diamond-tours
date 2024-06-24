import { IoTrashBinOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoMdPaperPlane } from "react-icons/io";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import {db} from '../../firebase';

type ChatProps = {
    id:string,
    message:string,
    time:Timestamp,
    read:boolean,
    userId:string,
    sent:boolean
}

export type ShowChatProps = {
    showChat:boolean,
    setShowChat: React.Dispatch<React.SetStateAction<boolean>>
}

const Chat = ({showChat, setShowChat}:ShowChatProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [chats, setChats] = useState<ChatProps[]>([]);
    const [currentId, setCurrentId] = useState<string>('');
    
    const formRef = useRef<HTMLFormElement | null>(null)

    const handleEnterPress: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.key === 'Enter' && event.shiftKey) {
          formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
        
      };


      useEffect(()=>{
      
        const reference = collection(db, 'Chats');
        const q = query(reference, where('userId', '==', '1234'))
        const unsub = onSnapshot(
            q,  (snapshot)=>{
                const list:ChatProps[] = [];
                snapshot.docs.forEach((doc)=>{
                    list.push({id:doc.id, ...doc.data()} as ChatProps )
                })
                // console.log(list)
                setChats(list.sort((a, b)=> new Date(a.time.toDate()) < new Date(b.time.toDate()) ? -1:1));
                
            },
            (error)=>{
                console.log(error)
            },
        )
        // user && unsub();
        return()=>{
            unsub()
        }
    },[])


    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (chatContainerRef.current) {
        // chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
        chatContainerRef.current?.scrollHeight;
    }
    }, [chats]);



    const sendChat = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(message.trim()!==''){
            setIsLoading(true);
            try {
                await addDoc(collection(db, 'Chats'), {
                    message, userId:'1234', time:serverTimestamp(), read:false, sent:true
                })
                // chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
                chatContainerRef.current?.scrollHeight
                formRef.current?.reset();
                setMessage('');
            } catch (error) {
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        }
    }

    const deleteChat = async(id:string)=>{
        setCurrentId(id);
        try {
            await deleteDoc(doc(db, 'Chats', id))
        } catch (error) {
            console.log(id);
        }finally{
            setCurrentId('')
        }
    }

    const sentStyle = "bg-black w-max min-w-20 p-2  text-white rounded-xl self-end";
    const receivedStyle = "bg-white w-max min-w-20 p-2 text-black rounded-xl";
    const sentAlign = "flex w-max min-w-20 max-w-[90%] flex-col self-end";
    const receivedAlign = "flex w-max min-w-20 max-w-[90%] flex-col";
    const chatStyle = "w-80 md:w-[30rem] py-8 px-4 flex-col bg-slate-700 h-[30rem] bottom-24 right-2 md:right-8 rounded-2xl fixed z-10 justify-between flex";
    const normalStyle = "flex items-center justify-center p-4 hover:bg-orange-400 bg-[#cb4900] rounded-full cursor-pointer";
    const loadStyle = "flex items-center justify-center p-4 bg-slate-400 rounded-full cursor-default";

  return (
    <div className={showChat? chatStyle : 'hidden'}>
        <button onClick={()=>setShowChat(false)} className="absolute text-4xl right-2 top-0 cursor-pointer text-red-500 rounded-full hover:text-red-300" >&times;</button>
        <div className="flex flex-row gap-4 items-center justify-center">
            <img src="/imgs/9187604.png" className="w-6 h-6 rounded-full" alt="" />
            <h2 className="font-bold text-white text-[1rem] text-left w-full">Live Chat with <span className="text-[#e7854b]">Dimaond Tours</span></h2>
        </div>
        <div ref={chatContainerRef} className="flex  flex-col w-full h-3/4 overflow-y-scroll overflow-x-hidden mt-4 gap-4 md:gap-6 border border-slate-400 py-2 px-1">
        {
            chats.length > 0 &&
            chats.map((chat:ChatProps)=>(
                <div key={chat.id} className={chat.sent?sentAlign:receivedAlign}>
                    <div className={chat.sent ? sentStyle:receivedStyle}>
                        <p className="text-[0.8rem]" >{chat.message}</p>
                    </div>
                    <div className="flex flex-row justify-center items-row self-end gap-2 mt-1">
                        {
                            (chat.sent && chat.read) &&
                            <IoCheckmarkDoneOutline size={16} className={chat.read? "text-blue-400" : 'text-slate-300'}/>
                        }
                        {/* <small className="text-[0.8rem] text-slate-300" >{chat.time.toDate().toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                        }) + ' ' + chat.time.toDate().toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            timeZone: 'America/New_York',
                        })}</small> */}
                        <small className="text-[0.6rem] text-slate-300" >{chat.time.toDate().toLocaleString(navigator.language, {
                            dateStyle: 'short',
                            timeStyle: 'short',
                        })}</small>
                        {
                            currentId !== chat.id &&
                            <IoTrashBinOutline onClick={()=>deleteChat(chat.id)} className="cursor-pointer" size={20} color="tomato" />
                        }
                    </div>
                </div>
            ))
        }
        </div>
        <form onSubmit={sendChat} ref={formRef} className="w-full items-center justify-between flex flex-row bg-[#d9d9d9] rounded-full bottom-4 self-center">
            <textarea onKeyDown={handleEnterPress} onChange={(e)=>setMessage(e.target.value)} required rows={1} placeholder="type here" className="outline-none px-4 py-2 border-none rounded-full bg-[#d9d9d9] w-5/6" />
            <button disabled={isLoading} type='submit' className={isLoading?loadStyle:normalStyle}>
                <IoMdPaperPlane size={20} color="white" />{}
            </button>
        </form>
    </div>
  )
}

export default Chat