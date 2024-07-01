import React, { useEffect, useRef, useState } from "react";
// import AppCard from "../miscellaneous/AppCard";
import Header from "../miscellaneous/Header"
import { IoIosArrowRoundBack } from "react-icons/io";
import { BookingsProps,  FeedbackProps,  PageProp } from "../assets/types/Types";
import axios from "axios";
import { API } from "../common/contants";
import  {Alert}  from "@mui/material";


const Appointments = ({setCurrentPage}:PageProp) => {
    const [cancelMode, setCancelMode] = useState<boolean>(false);
    const [pendings, setPendings] =useState<BookingsProps[]>([]);
    const [confirms, setConfirms] =useState<BookingsProps[]>([]);
    const [historys, setHistorys] =useState<BookingsProps[]>([]);
    const [viewMode, setViewMode] =useState<string>('pending');
    const [currentApp, setCurrentApp] = useState<BookingsProps>();
    const [feedback, setFeedback] = useState<FeedbackProps>({error:false, message:''});
    const [reason, setReason] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
              const pen = await axios.get(`${API}bookings`);
              if(pen.data){
                setPendings(pen.data.filter((item:BookingsProps)=>(item.status==='Pending') && new Date() < new Date(item.date)));
                setConfirms(pen.data.filter((item:BookingsProps)=>(item.status==='Approved') && new Date() < new Date(item.date)));
                setHistorys(pen.data.filter((item:BookingsProps)=> new Date() > new Date(item.date)));
              }  
            } catch (error) {
              console.log(error)
            }
         
        }
        fetchData();
      },[pendings, confirms, historys])


      const sendReason = async(e:React.FormEvent<HTMLFormElement>, book: BookingsProps)=>{
        e.preventDefault();
        setIsLoading(true);
        setFeedback({error:false, message:''});
        if(reason.trim() !== ''){
          try {
            const data = {email:book.email, name:book.fullname.first, message:reason};
            const res = await axios.post(`${API}messages/admin/${book._id}`, data)
            if(res.status === 200){
              setFeedback({error:false, message:'Operation successful'})
              setReason('');
              formRef.current?.reset();
            }
          } catch (error) {
            console.log(error)
          }finally{
            setIsLoading(false);
          }
        }
      }

      const handleCancelApp = (app:BookingsProps)=>{
        setCurrentApp(app);
        setCancelMode(true)
      }
      const handleCancelCancel = ()=>{
        setCurrentApp(undefined);
        setCancelMode(false)
      }

    const onConfirm = async(id:string)=>{
        const data = {status:'Approved'};
        try {
            const res = await axios.put(`${API}bookings/${id}`, data);
            if(res.status === 200){
                setFeedback({error:false, message:'Operation successfull'});
            }
        } catch (error) {
            console.log(error);
            setFeedback({error:true, message:'Error occured. Please retry'});
        }
    }
    const deleteHistory = async(id:string)=>{
        try {
            await axios.delete(`${API}bookings/${id}`);
            setFeedback({error:false, message:'Operation successfull'});
        } catch (error) {
            console.log(error);
            setFeedback({error:true, message:'Error occured. Please retry'});
        }
    }

    
    
    const handlePendings = ()=>{
        setCurrentApp(undefined);
        setViewMode("pending");
        setCancelMode(false);
        setReason('');
    }
    const handleConfirms = ()=>{
        setCurrentApp(undefined);
        setViewMode("confirmed");
        setCancelMode(false);
        setReason('');
    }
    const handleHistorys = ()=>{
        setCurrentApp(undefined);
        setViewMode("history");
        setCancelMode(false);
        setReason('');
    }



  return (
    <section className=" flex flex-col items-center gap-8">
      <Header newsButton={false} />
      {
        feedback.message &&
        <Alert onClose={()=>setFeedback({error:false, message:''})} severity={feedback.error?'error':'success'} >{feedback.message}</Alert>
      }
      <div className="flex gap-4 flex-col items-center w-[90%]">
        <div className="flex flex-row items-center justify-center gap-1 md:gap-4 self-start">
          <IoIosArrowRoundBack
            onClick={() => setCurrentPage("home")}
            size={30}
            className="cursor-pointer"
          />
          <h2 className="font-semibold text-xl md:text-2xl">Appointments</h2>
        </div>
        <div className="flex flex-col gap-4 w-[90%] justify-center items-center">
          <div className="flex flex-row justify-center md:justify-around w-full gap-4">
            <span
              onClick={handlePendings}
              className={`text-[1rem] ${
                viewMode === "pending" ? "text-[#cb4900]" : "text-black"
              } md:text-xl md:hover:bg-slate-100 hover:px-2 font-semibold cursor-pointer`}
            >
              Pending
            </span>
            <span
              onClick={handleConfirms}
              className={`text-[1rem] ${
                viewMode === "confirmed" ? "text-[#cb4900]" : "text-black"
              } md:text-xl md:hover:bg-slate-100 hover:px-2 font-semibold cursor-pointer`}
            >
              Confirmed
            </span>
            <span
              onClick={handleHistorys}
              className={`text-[1rem] ${
                viewMode === "history" ? "text-[#cb4900]" : "text-black"
              } md:text-xl md:hover:bg-slate-100 hover:px-2 font-semibold cursor-pointer`}
            >
              History
            </span>
          </div>
        </div>
        <hr className="w-full bg-slate-700" />
        <div className="w-full flex flex-col gap-8 items-center">
          {
            (pendings.length > 0 && viewMode === 'pending')?
            pendings.map((item:BookingsProps)=>(

              <div key={item?._id} className='flex flex-col p-6 bg-white shadow-xl rounded-xl md:rounded-2xl w-full lg:w-[90%] gap-4'>
                <span className='text-[1rem] font-semibold text-right'>{new Date(item?.date).toLocaleString(navigator.language, {
                            dateStyle: 'short',
                            timeStyle: 'short',
                        })}</span>
                <div className='flex flex-col gap-3'>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Name: <span className='font-normal'>{item?.fullname?.first+' '+item?.fullname?.last }</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Email: <span className='font-normal'>{item?.email}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Phone: <span className='font-normal'>{item?.phone}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Service: <span className='font-normal'>{item?.service}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Package: <span className='font-normal'>{item?.packages}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Location: <span className='font-normal'>{item?.location?.country+', '+item?.location?.region+', '+item?.location?.city}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Status: <span className='font-normal'>{item?.status}</span> </span>
                </div>
                {
                  (!cancelMode && currentApp?._id !== item?._id) &&
                  <div className="flex w-full flex-row items-center justify-between">
                    <button onClick={()=>onConfirm(item?._id)} type='button' className='bg-[#cb4900] px-3 py-1 rounded-full text-white text-[0.8rem] md:text-[0.9rem] hover:bg-orange-400' >Confirm</button>
                    <button onClick={()=>handleCancelApp(item)} type='button' className='border self-end border-slate-500 px-3 py-1 rounded-full text-black text-[0.8rem] md:text-[0.9rem] hover:bg-slate-100' >Cancel</button>
                  </div>
                }
                {
                  (cancelMode && currentApp?._id === item?._id) &&
                  <form ref={formRef} className='w-full flex flex-col gap-2' onSubmit={(e)=>sendReason(e, item)} >
                    <textarea required onChange={(e)=>setReason(e.target.value)} className='w-full p-2 border border-slate-400 rounded-2xl outline-none placeholder:italic' rows={5} placeholder="Let the client know why you are cancelling their appointment" />
                    <div className="flex  self-end items-center justify-center gap-4">
                      <button onClick={handleCancelCancel} type='button' className='border self-end border-slate-500 px-3 py-1 rounded-full text-black text-[0.8rem] md:text-[0.9rem] hover:bg-slate-100' >Cancel</button>
                      <button disabled={isLoading} type='submit' className={`bg-[#cb4900] w-fit px-6 py-1 rounded-xl text-white text-[0.8rem] md:text-[0.9rem] hover:bg-orange-400 ${isLoading?'bg-orange-200 cursor-default':'bg-[#cb4900] cursor-pointer'}`} >{isLoading?'Loading...':'Proceed'}</button>
                    </div>
                  </form>
                }
              </div>
            )):

            (confirms.length > 0 && viewMode === 'confirmed')?
            confirms.map((item:BookingsProps)=>(

              <div key={item?._id} className='flex flex-col p-6 bg-white shadow-xl rounded-xl md:rounded-2xl w-full lg:w-[90%] gap-4'>
                <span className='text-[1rem] font-semibold text-right'>{new Date(item?.date).toLocaleString(navigator.language, {
                            dateStyle: 'short',
                            timeStyle: 'short',
                        })}</span>
                <div className='flex flex-col gap-3'>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Name: <span className='font-normal'>{item?.fullname?.first+' '+item?.fullname?.last }</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Email: <span className='font-normal'>{item?.email}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Phone: <span className='font-normal'>{item?.phone}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Service: <span className='font-normal'>{item?.service}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Package: <span className='font-normal'>{item?.packages}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Location: <span className='font-normal'>{item?.location?.country+', '+item?.location?.region+', '+item?.location?.city}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Status: <span className='font-normal'>{item?.status}</span> </span>
                </div>
                
                {
                  (!cancelMode && currentApp?._id !== item?._id) &&
                  <div className="flex w-full flex-row items-center justify-between">
                    <button onClick={()=>handleCancelApp(item)} type='button' className='border self-end border-slate-500 px-3 py-1 rounded-full text-black text-[0.8rem] md:text-[0.9rem] hover:bg-slate-100' >Cancel</button>
                  </div>
                }
                {
                  (cancelMode && currentApp?._id === item?._id) &&
                  <form ref={formRef} onSubmit={(e)=>sendReason(e, item)} className='w-full flex flex-col gap-2' >
                    <textarea required onChange={(e)=>setReason(e.target.value)} className='w-full p-2 border border-slate-400 rounded-2xl outline-none placeholder:italic' rows={5} placeholder="Let the client know why you are cancelling their appointment" />
                    <div className="flex  self-end items-center justify-center gap-4">
                      <button onClick={handleCancelCancel} type='button' className='border self-end border-slate-500 px-3 py-1 rounded-full text-black text-[0.8rem] md:text-[0.9rem] hover:bg-slate-100' >Cancel</button>
                      <button type='submit' disabled={isLoading} className={`${isLoading?'bg-orange-200 cursor-default':'bg-[#cb4900] cursor-pointer'} w-fit px-6 py-1 rounded-xl text-white text-[0.8rem] md:text-[0.9rem] hover:bg-orange-400`} >{isLoading?'Loading...':'Proceed'}</button>
                    </div>
                  </form>
                }
                
              </div>
            )):

            (historys.length > 0 && viewMode === 'history')?
            historys.map((item:BookingsProps)=>(

              <div key={item?._id} className='flex flex-col p-6 bg-white shadow-xl rounded-xl md:rounded-2xl w-full lg:w-[90%] gap-4'>
                <span className='text-[1rem] font-semibold text-right'>{new Date(item?.date).toLocaleString(navigator.language, {
                            dateStyle: 'short',
                            timeStyle: 'short',
                        })}</span>
                <div className='flex flex-col gap-3'>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Name: <span className='font-normal'>{item?.fullname?.first+' '+item?.fullname?.last }</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Email: <span className='font-normal'>{item?.email}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Phone: <span className='font-normal'>{item?.phone}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Service: <span className='font-normal'>{item?.service}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Package: <span className='font-normal'>{item?.packages}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Location: <span className='font-normal'>{item?.location?.country+', '+item?.location?.region+', '+item?.location?.city}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Status: <span className='font-normal'>{item?.status}</span> </span>
                </div>
                
                  <div className="flex w-full flex-row items-center justify-between">
                    <button onClick={()=>deleteHistory(item?._id)} type='button' className='border self-end border-slate-500 px-3 py-1 rounded-full text-black text-[0.8rem] md:text-[0.9rem] hover:bg-slate-100' >Delete</button>
                  </div>
                
              </div>
            ))
            :

            <h2>There are no appointments here</h2>
          }
          
        </div>
      </div>
    </section>
  );
}

export default Appointments