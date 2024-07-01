import { IoIosArrowRoundBack } from "react-icons/io"
import Header from "../miscellaneous/Header"
import React, { useEffect, useRef, useState } from "react"
import { CiSearch } from "react-icons/ci";
import { IoTrashBinOutline } from "react-icons/io5";
import Subscribers from "../miscellaneous/Subscribers";
import { EmailsProps, FeedbackProps, MessageProps, PageProp } from "../assets/types/Types";
import axios from "axios";
import { API } from "../common/contants";
import { Alert } from "@mui/material";


const Newsletter = ({setCurrentPage}:PageProp) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [emails, setEmails] = useState<EmailsProps[]>([]);
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [search, setSearch] = useState<string>('')
    const [currentMessage, setCurrentMessage] = useState<MessageProps>();

    const [feedback, setFeedback] = useState<FeedbackProps>({error:false, message:''});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await axios.get(`${API}news`);
                if(res.status === 200){
                    setEmails(res.data);
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[emails])

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const news = await axios.get(`${API}messages/many`);  
                if(news.status === 200){
                    setMessages(
                      news.data.sort((a: MessageProps, b: MessageProps) =>
                        new Date(a?.createdAt)?.toLocaleTimeString() <
                        new Date(b?.createdAt)?.toLocaleTimeString()
                          ? 1
                          : -1
                      )
                    );
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[messages])

    // console.log(messages)
    // console.log(emails)


    const sendNews = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(false);
        setFeedback({error:false, message:''});
        try {
            if(message.trim() !=='' && subject.trim() !==''){
                const data = {subject, message, emails};
                const res =  await axios.post(`${API}messages/many`, data);
                if(res.status === 201){
                    setFeedback({error:false, message:`Emails sent to ${emails.length} clients`})
                    formRef.current?.reset();
                }
            }else{
                setFeedback({error:true, message:'Please complete the form'});
            }
        } catch (error) {
            console.log(error);
            setFeedback({error:true, message:'Error occured. Please retry'})
        }finally{
            setIsLoading(false);
        }
    }

    const handleOpenMessage = (mess:MessageProps)=>{
        setIsOpen(true);
        setCurrentMessage(mess);
    }
    const handleCloseMessage = ()=>{
        setIsOpen(false);
        setCurrentMessage(undefined);
    }

    const deleteNews =async(id:string)=>{
        try {  
            await axios.delete(`${API}messages/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section className=' flex flex-col items-center gap-8' >
    <Header newsButton={false} />
    {
        openModal &&
        <Subscribers emails={emails} openModal={openModal} setOpenModal={setOpenModal} />
    }
    <div className="flex gap-4 flex-col items-center w-[90%]">
        <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center justify-center gap-1 md:gap-4 self-start">
                <IoIosArrowRoundBack onClick={()=>setCurrentPage('home')} size={30} className='cursor-pointer' />
                <h2 className="font-semibold text-xl md:text-2xl">Newsletter</h2>
            </div>
            <span onClick={()=>setOpenModal(true)} className="text-orange-400 underline cursor-pointer md:mr-8">{emails?.length} Subscribers</span>
        </div>
    </div>
    <div className="flex flex-col lg:flex-row-reverse w-5/6 gap-4 items-start justify-center lg:justify-between">
       
        <div className="flex flex-col gap-2 items-center lg:items-start w-full lg:w-1/2">
            <span className='text-[#cb4900] text-[1rem] text-left font-semibold' >Compose newsletter</span>
            <form ref={formRef} onSubmit={sendNews} className='w-full flex flex-col p-8 self-center items-center gap-6 shadow-xl rounded-2xl relative' >    
            {
                feedback.message &&
                <Alert onClose={()=>setFeedback({error:false, message:''})} severity={feedback.error?'error':'success'} >{feedback.message}</Alert>
            }   
                <div className="flex flex-row gap-4 items-center justify-start w-full border-b border-slate-300">
                    <span className="hidden md:block text-xl font-semibold w-20">Title: </span>
                    <input onChange={(e)=>setSubject(e.target.value)} required className='grow px-2 py-2  rounded-lg outline-none placeholder:italic' type="text" placeholder='News title' />
                </div>
                <div className="flex flex-row gap-4 items-start justify-start w-full border-b border-slate-300 relative">
                    <span className="hidden md:block text-xl font-semibold w-20">Content: </span>
                    <textarea  onChange={(e)=>setMessage(e.target.value)} required rows={5} className='grow px-2 py-2  rounded-lg outline-none lg:h-60 placeholder:italic' placeholder='Enter news content' />
                    <button disabled={isLoading} type='submit' className={`py-1 px-8 ${isLoading ? 'cursor-default bg-orange-400':'bg-[#cb4900]'} absolute bottom-2 text-white right-2 rounded-full hover:bg-orange-400 flex items-center justify-center`} >{isLoading ? 'Sending...':'Send'}</button>
                </div>
            </form>
        </div>
            {
                !isOpen &&
        <div className="flex flex-col w-full items-start justify-center lg:w-1/2">
            <div className='flex flex-row w-full items-center justify-center bg-slate-100 relative px-4 rounded-xl mb-4' >
                <CiSearch size={24} className='text-slate-500 absolute left-2' />
                <input type="text" placeholder="search..." onChange={(e)=>setSearch(e.target.value)} className='w-full outline-none border-none py-2 px-4 bg-transparent placeholder:italic' />
            </div>
                <div className="w-full flex flex-col items-start justify-center">
                    {
                        messages.length > 0?
                        messages.filter((sess:MessageProps)=>{
                            return search === ''? sess : Object.values(sess)
                            .join(' ')
                            .toLowerCase() 
                            .includes(search.toLowerCase())}).map((message:MessageProps)=>(
                        <div key={message?._id}  className="flex w-full flex-row justify-between items-start py-2 px-4 bg-slate-100 border-t border-b border-slate-500 cursor-pointer">
                            <div onClick={()=>handleOpenMessage(message)} className="flex flex-col gap-2 grow">
                                <span className="text-2xl text-[#cb4900] font-semibold">{new Date(message?.createdAt).toLocaleDateString()}</span>
                                <span className='text-sm md:text-[1rem] text-ellipsis' >{message?.message.slice(0,30)}</span>
                            </div>
                            <IoTrashBinOutline onClick={()=>deleteNews(message?._id)} size={24} color="crimson" className='cursor-pointer z-20' />
                        </div>

                        ))
                        :
                        <h2>There is Nothing here yet</h2>
                    }
                </div>
            
        </div>
            }
        {
            isOpen &&
            <div className="flex flex-col w-full lg:w-1/2 bg-white shadow-xl h-[30rem] p-8 items-start overflow-x-hidden overflow-y-scroll">
                <div className="flex flex-row justify-between w-full mb-4">
                    <IoIosArrowRoundBack onClick={handleCloseMessage} size={30} className=' cursor-pointer self-start' />
                    <span className=''>{currentMessage && new Date(currentMessage?.createdAt).toLocaleDateString()}</span>
                </div>
                <span className='text-slate-500 text-[0.8rem] md:text-[1rem]' >
                    {currentMessage?.message}
                </span>
            </div>
        }
    </div>
</section>
  )
}

export default Newsletter