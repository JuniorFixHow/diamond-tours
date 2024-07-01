import React, { useRef, useState } from 'react'
import { HiPaperAirplane } from "react-icons/hi2";
import { ContactProps, FeedbackProps } from '../assets/types/Types';
import axios from 'axios';
import { API } from '../common/contants';
import { Alert } from '@mui/material';
type MessageBoxProps={
    showEmail:boolean,
    handleCloseNew: ()=>void,
    contact?:ContactProps
}



const MessageBox = ({showEmail, handleCloseNew, contact}:MessageBoxProps) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [feedback, setFeedback] = useState<FeedbackProps>({error:false, message:''});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');

  
    const sendNewMessagge = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        setFeedback({error:false, message:''});
        try {
            if(email.trim() !=='' && subject.trim() !=='' && message.trim() !==''){
                const data = {email, subject, message, name:'Client'};
                const res = await axios.post(`${API}messages/one`, data);
                if(res.status === 201){
                    setFeedback({error:false, message:res.data});
                    formRef.current?.reset();
                }
            }else{
                setFeedback({error:true, message:'Please complete the form'});
            }
        } catch (error) {
            console.log(error);
            setFeedback({error:true, message:'Error occured. Please retry.'});
        }finally{
            setIsLoading(false);
        }
    }
    const replyMessagge = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        setFeedback({error:false, message:''});
        try {
            if(subject.trim() !=='' && message.trim() !==''){
                const data = {email:contact?.email, subject, message, name:contact?.name.split(' ')[0]};
                // console.log(data);
                const res = await axios.post(`${API}messages/one`, data);
                if(res.status === 201){
                    setFeedback({error:false, message:res.data});
                    formRef.current?.reset();
                }
            }else{
                setFeedback({error:true, message:'Please complete the form'});
            }
        } catch (error) {
            console.log(error);
            setFeedback({error:true, message:'Error occured. Please retry.'});
        }finally{
            setIsLoading(false);
        }
    }

  return (
    <form ref={formRef} onSubmit={showEmail?sendNewMessagge:replyMessagge} className='w-full lg:w-1/2 flex flex-col p-8 self-center items-center gap-6 shadow-xl rounded-2xl relative' >
        <button onClick={handleCloseNew} type='button' className='w-4 h-4 absolute top-0 right-4 rounded-full bg-red-600 flex items-center justify-center text-white' >&times;</button>
        {
            feedback.message &&
            <Alert onClose={()=>setFeedback({error:false, message:''})} severity={feedback.error?'error':'success'} >{feedback.message}</Alert>
        }
        {
            showEmail &&
            <div className="flex flex-row gap-4 items-center justify-start w-full border-b border-slate-300">
                <span className="hidden md:block text-xl font-semibold w-20">To: </span>
                <input onChange={(e)=>setEmail(e.target.value)} required className='grow px-2 py-2  rounded-lg outline-none' type="email" placeholder='Email address' />
            </div>
        }
        <div className="flex flex-row gap-4 items-center justify-start w-full border-b border-slate-300">
            <span className="hidden md:block text-xl font-semibold w-20">Subject: </span>
            <input onChange={(e)=>setSubject(e.target.value)} required className='grow px-2 py-2  rounded-lg outline-none' type="text" placeholder='Subject' />
        </div>
        <div className="flex flex-row gap-4 items-start justify-start w-full border-b border-slate-300 relative">
            <span className="hidden md:block text-xl font-semibold w-20">Body: </span>
            <textarea onChange={(e)=>setMessage(e.target.value)} required rows={5} className='grow px-2 py-2  rounded-lg outline-none' placeholder='Enter message content' />
            <button disabled={isLoading} type='submit' className={`w-9 h-9  ${isLoading?'bg-orange-400':'bg-[#cb4900]'} absolute ${isLoading && 'cursor-default'} bottom-2 right-2 rounded-full hover:bg-orange-400 flex items-center justify-center`} ><HiPaperAirplane color='white' />{}</button>
        </div>
    </form>
  )
}

export default MessageBox