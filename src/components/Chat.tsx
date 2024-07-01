import { IoIosArrowRoundBack } from "react-icons/io"
import Header from "../miscellaneous/Header"
import { CiSearch } from "react-icons/ci"
import { IoTrashBinOutline } from "react-icons/io5"
import { HiPaperAirplane } from "react-icons/hi2"
import { KeyboardEventHandler, useEffect, useRef, useState } from "react"
import { ChatProps, PageProp } from "../assets/types/Types"
import { useFetch } from "../hooks/useFetch"
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import { db } from "../firebase"

const Chat = ({setCurrentPage}:PageProp) => {
    const [openChat, setOpenChat] = useState<string>('hidden');
    const [singleChats, setSignleChats] = useState<ChatProps[]>([]);
    const [currentChat, setCurrentChat] = useState<ChatProps>();
    const [currentId, setCurrentId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const {chats} = useFetch();
    // console.log(chats)

    useEffect(()=>{
        if(currentChat){

            const reference = collection(db, 'Chats');
            const q = query(reference, where('userId', '==', currentChat?.userId))
            const unsub = onSnapshot(
                q,  (snapshot)=>{
                    const list:ChatProps[] = [];
                    snapshot.docs.forEach((doc)=>{
                        list.push({id:doc.id, ...doc.data()} as ChatProps )
                    })
                    // console.log(list)
                    if(list.length){
                        setSignleChats(list.sort((a, b)=> a?.time?.toDate() < b?.time?.toDate() ? -1:1));
                    }
                    
                },
                (error)=>{
                    console.log(error)
                },
            )
            // user && unsub();
            return()=>{
                unsub()
            }
        }
      },[currentChat])

      const openChatPage =async(chat:ChatProps)=>{
        setOpenChat("flex");
        setCurrentChat(chat);
        if(!chat?.read){
          try {
            await updateDoc(doc(db, 'Chats', chat?.id),{read:true})
        } catch (error) {
            console.log(error);
        }
        }
      }
      const closeChatPage =()=>{
        setOpenChat("hidden");
        setCurrentChat(undefined);
      }


      const chatContainerRef = useRef<HTMLDivElement | null>(null);
      const formRef = useRef<HTMLFormElement | null>(null);

      const sendChat = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(message.trim()!==''){
            setIsLoading(true);
            try {
                await addDoc(collection(db, 'Chats'), {
                    message, userId: currentChat?.userId, time:serverTimestamp(), read:true, sent:false,
                    lastMessage:message,
                    user:{
                        email:currentChat?.user?.email,
                        hasImage:currentChat?.user?.hasImage,
                        image: currentChat?.user?.image,
                        name: currentChat?.user?.name
                    }
                })
                chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    const handleEnterPress: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.key === 'Enter' && event.shiftKey) {
          formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
        
    };

      const deleteChat = async(id:string)=>{
        setCurrentId(id);
        try {
            await deleteDoc(doc(db, 'Chats', id))
        } catch (error) {
            console.log(error);
        }finally{
            setCurrentId('')
        }
    }
// console.log(currentChat);


const deleteChatsForUser=async(userId: string)=> {
    try {
      // Create a query to get all chat documents for the given userId
      const chatQuery = query(collection(db, 'Chats'), where('userId', '==', userId));
      const chatSnapshot = await getDocs(chatQuery);
  
      // Delete each chat document
      for (const chatDoc of chatSnapshot.docs) {
        await deleteDoc(chatDoc.ref);
      }
  
      console.log(`Deleted ${chatSnapshot.size} chat documents for user ${userId}`);
    } catch (error) {
      console.error('Error deleting chats:', error);
    }
  }

  return (
    <section className=" flex flex-col items-center gap-6">
      <Header newsButton={false} />
      <div className="flex gap-4 flex-col items-center w-[90%]">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center justify-center gap-1 md:gap-4 self-start">
            <IoIosArrowRoundBack
              onClick={() => setCurrentPage("home")}
              size={30}
              className="cursor-pointer"
            />
            <h2 className="font-semibold text-xl md:text-2xl">Chats</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-5/6 mb-4 items-start justify-between gap-4 p-4 md:p-8 border border-black rounded-2xl shadow-lg">
        <div
          className={`${
            openChat === "flex" && "hidden"
          } lg:flex flex-col items-center w-full gap-2 lg:w-1/2`}
        >
          <div className="flex flex-row w-full items-center justify-center bg-slate-100 relative px-4 rounded-xl mb-4">
            <CiSearch size={24} className="text-slate-500 absolute left-2" />
            <input
              type="text"
              placeholder="search"
              className="w-full outline-none border-none py-2 px-4 bg-transparent placeholder:italic"
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-4 items-center justify-start overflow-x-hidden overflow-y-scroll h-[25rem] py-4 px-2">
            {chats?.length > 0 ? (
              chats.filter((sess:ChatProps)=>{
                return search === ''? sess : Object.values(sess)
                .join(' ')
                .toLowerCase() 
                .includes(search.toLowerCase())})
            .map((chat: ChatProps) => (
                <div key={chat?.id}
                  onClick={()=>openChatPage(chat)}
                  className="flex flex-row items-center justify-start py-2 gap-2 w-full cursor-pointer"
                >
                  <img
                    src={
                      chat?.user?.image
                        ? chat?.user?.image
                        : "/imgs/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
                    }
                    className="h-9 w-9 object-cover rounded-full"
                    alt="user"
                  />
                  <div className="flex flex-col relative grow">
                    <span className="text-[0.8rem] md:text-[1rem]">
                      {chat.user?.name}
                    </span>
                    <small className={`${chat?.read?'font-normal':'font-semibold'} text-[0.7rem] md:text-[0.8rem] text-ellipsis`}>
                      {chat?.lastMessage?.slice(0, 30)}
                    </small>
                    {/* <span className="p-1 bg-[#cb4900] text-white text-[0.5rem] rounded-full absolute right-0 -top-3">
                      2
                    </span> */}
                    <small className="absolute text-[0.6rem] text-slate-400 right-0 -bottom-1">
                      {chat?.time?.toDate().toLocaleString(navigator.language, {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </small>
                    <IoTrashBinOutline
                        color="crimson"
                        size={15}
                        className="cursor-pointer absolute right-2 -top-3"
                        onClick={()=>deleteChatsForUser(chat?.userId)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <h2>Nothing here yet</h2>
            )}
          </div>
        </div>
        <div className="w-[1px] h-[28rem] hidden lg:block bg-slate-500" />

        <div
          className={`${openChat} lg:flex w-full lg:w-1/2 flex-col relative`}
        >
          <div className="flex flex-row items-center justify-start py-3 px-2 gap-3 lg:hidden shadow-lg">
            <IoIosArrowRoundBack
              onClick={closeChatPage}
              size={30}
              className="cursor-pointer"
            />
            <img
              src={
                currentChat?.user?.image
                  ? currentChat?.user?.image
                  : "/imgs/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
              }
              className="h-8 w-8 object-cover rounded-full"
              alt="user"
            />
            <span className="font-semibold text-[0.8rem]">{currentChat?.user?.name}</span>
          </div>
          <div ref={chatContainerRef} className="flex flex-col w-full h-[25rem] gap-6 grow overflow-x-hidden overflow-y-scroll mt-4 pb-20">
            {
                singleChats?.length > 0?
                singleChats.map((chat:ChatProps)=>(
                    <div key={chat?.id} className={`flex flex-col max-w-[90%] lg:max-w-[80%] w-fit ${!chat?.sent && 'self-end items-end' }`}>
                    <div className={`${!chat?.sent ? 'bg-[#cb4900]':'bg-blue-800'} rounded-md lg:rounded-lg flex flex-col gap-1 w-fit p-2`}>
                        <span className="text-white text-[0.8rem]">
                         {chat?.message}
                        </span>
                    </div>
                    <div className="flex flex-row items-center gap-2 self-end">
                        <small className="text-slate-400 text-[0.6rem]">{chat?.time?.toDate().toLocaleString(navigator.language, {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}</small>
                      {
                        (currentId !== chat?.id) && !chat?.sent &&
                        <IoTrashBinOutline
                        color="crimson"
                        size={15}
                        className="cursor-pointer"
                        onClick={()=>deleteChat(chat?.id)}
                        />
                      }
                    </div>
                    </div>
                ))
                :
                <h2>Nothing in here yet</h2>
            }

            {/* <div className="flex flex-col max-w-[90%] lg:max-w-[80%] w-fit self-end">
              <div className="bg-blue-800 rounded-md lg:rounded-lg flex flex-col gap-1 w-fit p-2">
                <span className="text-white text-[0.8rem]">
                </span>
              </div>
              <div className="flex flex-row items-center gap-2 self-end">
                <small className="text-slate-400 text-[0.6rem]">12/10/22</small>
                <IoTrashBinOutline
                  color="crimson"
                  size={15}
                  className="cursor-pointer"
                />
              </div>
            </div> */}
          </div>
          {
            currentChat && 
            <form ref={formRef} onSubmit={sendChat} className="w-full flex flex-row items-center justify-center gap-2 lg:gap-4 absolute bottom-0 lg:-bottom-10">
              <textarea
                required
                className="grow bg-slate-100 border-none outline-none rounded-2xl px-4 py-2 lg:max-h-20"
                placeholder="type here..."
                onChange={(e)=>setMessage(e.target.value)}
                onKeyDown={handleEnterPress}
              />
              <button type='submit' className={`flex ${isLoading ? 'bg-orange-200 cursor-default':'bg-[#cb4900] cursor-pointer'} items-center justify-center p-2 h-8 w-8 lg:h-12 lg:w-12 rounded-full`}>
                <HiPaperAirplane color="white" className="text-xl lg:text-2xl" />{}
              </button>
            </form>
          }
        </div>
      </div>
    </section>
  );
}

export default Chat