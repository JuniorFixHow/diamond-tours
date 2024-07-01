import { useEffect, useState } from "react";
import Header from "../miscellaneous/Header"
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoPencilOutline, IoTrashBinOutline } from "react-icons/io5";
import MessageBox from "../miscellaneous/MessageBox";
import { ContactProps, PageProp } from "../assets/types/Types";
import axios from "axios";
import { API } from "../common/contants";


const Messages = ({setCurrentPage}:PageProp) => {
    const [messageList, setMessageList] = useState<string>('flex');
    const [showNew, setShowNew] = useState<boolean>(false);
    const [showEmail, setShowEmail] = useState<boolean>(false);
    const [currentContact, setCurrentContact] = useState<ContactProps>();
    const [contacts, setContacts] = useState<ContactProps[]>([]);

    const handleMessageClick = async(cont:ContactProps, id:string, isRead:boolean)=>{
        setMessageList('hidden');
        setShowNew(false);
        setCurrentContact(cont);
        if(!isRead){
            const data = {read:true};
            try {  
                await axios.put(`${API}contacts/${id}`, data);
            } catch (error) {
                console.log(error);
            }
        }
        // const 
        // update the message to read true
    }
    const handleBackClick = ()=>{
        setMessageList('flex');
        setShowNew(false);
        setCurrentContact(undefined);
    }
    const handleCloseNew = ()=>{
        setMessageList('flex');
        setShowNew(false);
        setShowEmail(true);
        setCurrentContact(undefined);
    }
    const handleNewClick = ()=>{
        setMessageList('hidden');
        setShowNew(true);
        setShowEmail(true);
        setCurrentContact(undefined);
    }
    const handleReplyClick = ()=>{
        setMessageList('hidden');
        setShowNew(true);
        setShowEmail(false);
    }


    useEffect(()=>{
        const fetchContacts =async()=>{
            try {
                const res= await axios.get(`${API}contacts`);
                if(res.status === 200){
                    setContacts(res.data.sort((a:ContactProps, b:ContactProps)=> new Date(a?.createdAt)?.toLocaleTimeString() < new Date(b?.createdAt)?.toLocaleTimeString() ? 1:-1));
                }

                
            } catch (error) {
                console.log(error);
            }
        }
        fetchContacts();
    },[contacts])


    const deleteMessage =async(id:string)=>{
        try {  
            await axios.delete(`${API}contacts/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section className=' flex flex-col items-center gap-8' >
        <Header newsButton={false} />
        <div className="flex gap-4 flex-col items-center w-[90%]">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center justify-center gap-1 md:gap-4 self-start">
                    <IoIosArrowRoundBack onClick={()=>setCurrentPage('home')} size={30} className='cursor-pointer' />
                    <h2 className="font-semibold text-xl md:text-2xl">Inbox</h2>
                </div>
                <div onClick={handleNewClick} className="flex justify-center items-center border border-[#cb4900] w-8 h-8 rounded-full cursor-pointer xl:mr-8 hover:bg-slate-300">
                <IoPencilOutline/>
            </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start justify-between w-[95%]">
                    
                    <div  className={`${messageList} lg:flex cursor-pointer flex-col items-start justify-center w-full lg:w-1/2`}>
                    {
                    contacts.length > 0?
                    contacts.map((contact:ContactProps)=>(
                        <div key={contact?._id} onClick={()=>handleMessageClick(contact, contact?._id, contact?.read)} className="flex flex-row gap-4 w-full px-2 py-4 justify-start items-center bg-slate-100 border border-slate-400 border-l-0 border-r-0 relative">
                            <img className='w-12 h-12 rounded-full' src="/imgs/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png" alt="sender" />
                            <div className="flex flex-col items-start justify-center gap-2">
                                <span className="font-semibold text-[#cb4900] text-xl md:text-2xl:">{contact?.name}</span>
                                <small className={`text-sm text-slate-500 text-ellipsis ${!contact?.read && 'font-bold'}`}>{contact?.message?.slice(0,30)}</small>
                            </div>
                            <IoTrashBinOutline onClick={()=>deleteMessage(contact?._id)} size={24} color="crimson" className='cursor-pointer absolute right-4' />
                        </div>
                        )):
                        <h2>Nothing here yet</h2>
                    }
                    </div>
                    
                {
                    (!showNew && currentContact) &&
                    <div className={`${messageList === 'flex' && 'hidden'} lg:flex flex-col w-full bg-white p-4 md:p-8 rounded-2xl shadow-xl lg:w-1/2 gap-4`}>
                        <span className="text-xl md:text-2xl font-semibold md:font-bold">{currentContact?.subject}</span>
                        <hr className='w-full bg-slate-500' />
                        <div className="flex flex-col p-4 items-start h-[30rem] overflow-x-hidden overflow-y-scroll gap-4 relative scroll-smooth">
                            <div className="flex flex-row w-full items-center justify-between ">
                                <IoIosArrowRoundBack onClick={handleBackClick} size={30} className='block lg:hidden cursor-pointer self-start' />
                                <span className='font-semibold lg:text-right lg:w-full' >{new Date(currentContact?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <span className={`text-[0.9rem] md:text-[1rem]`}>{currentContact?.message}</span>
                            <button onClick={handleReplyClick} type='button' className='bg-[#cb4900] text-white font-semibold rounded-full px-4 py-2 absolute bottom-2 right-0' >Reply</button>
                        </div>
                    </div>
                    // :
                    // <h2 className="w-full text-center text-2xl font-semibold" >Nothing here yet</h2>
                }
                {
                    showNew &&
                    <MessageBox contact={currentContact} showEmail={showEmail} handleCloseNew={handleCloseNew} />
                }
            </div>
        </div>
    </section>
  )
}

export default Messages