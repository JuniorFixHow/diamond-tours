import React, { useRef, useState } from "react"
import { AppProps, FeedbackProps } from "../assets/types/Types"


const AppCard = ({showConfirm, isCancel, currentId, setCurrentId, cancelMode, setCancelMode, onConfirm, fullname, _id, email, handleCancelApp, phone, date, location, service, packages, userId, status}:AppProps) => {
    const [feedback, setFeedback] = useState<FeedbackProps>({error:false, message:''});
    
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleCancel = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    }

    const confirmApp = ()=>{}
    // const handleCancelApp = ()=>{
    //     setCurrentId(_id);
    //     setCancelMode(true)
    // }

    const handleCloseCancel = ()=>{
        setCancelMode(false)
        setCurrentId('');
    }
    
    // console.log(currentId)
  return (
    <div  id={_id}  className='bg-white shadow-xl self-center md:self-start rounded-2xl p-4 flex flex-col gap-2 justify-center items-start w-5/6 md:w-full' >
        <span className="text-[0.9rem] md:text-xl font-semibold self-end">{new Date(date).toLocaleDateString()}</span>
        <span className="text-[0.9rem] md:text-xl font-semibold">Name: <span className='font-normal' >{fullname.first+' '+fullname.last}</span></span>
        <span className="text-[0.9rem] md:text-xl font-semibold">Email: <span className='font-normal' >{email}</span></span>
        <span className="text-[0.9rem] md:text-xl font-semibold">Phone: <span className='font-normal' >{phone}</span></span>
        <span className="text-[0.9rem] md:text-xl font-semibold">Location: <span className='font-normal' >{`${location.country}, ${location.region}, ${location.city}`}</span></span>
        <span className="text-[0.9rem] md:text-xl font-semibold">Service: <span className='font-normal' >{service}</span></span>
        <span className="text-[0.9rem] md:text-xl font-semibold">Package: <span className='font-normal' >{packages}</span></span>
        <span className="text-[0.9rem] md:text-xl font-semibold">Status: <span className='font-normal' >{status}</span></span>
        
        <div className="flex flex-row justify-between items-center mt-2 w-full">
            {
                showConfirm && !cancelMode &&
                <button onClick={onConfirm} type='button' className='bg-[#cb4900] text-white rounded-lg px-2 py-1' >Confirm</button>
            }
            {
                !cancelMode &&
                <button onClick={handleCancelApp} type='button' className='border border-black text-black rounded-lg px-2 py-1' >{isCancel ? 'Cancel':'Delete'}</button>
            }
        </div>
        {
            (cancelMode && currentId === _id) &&
            <form ref={formRef} onSubmit={handleCancel} className='w-full flex flex-col gap-2' >
                <textarea  rows={5} className='w-full p-2 rounded-xl border border-slate-500 outline-none' placeholder="Enter reason for cancelling this appointment" />
            <div className="flex flex-row justify-between items-center mt-2 w-full">
                <button onClick={handleCloseCancel} type='button' className='border border-black text-black rounded-lg px-2 py-1' >{isCancel ? 'Cancel':'Delete'}</button>
                <button className="bg-[#cb4900] text-white rounded-lg px-4 hover:bg-orange-400 py-1 self-end" type='submit'>Proceed</button>
            </div>
            </form>
        }
    </div>
  )
}

export default AppCard