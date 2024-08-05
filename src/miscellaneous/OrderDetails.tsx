import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { FlightDataProps, OrderProps } from "../types/Types"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { FeedbackProps } from "../assets/types/Types";
import { formatDateAndTime } from "../functions/Dates";
import { IoIosArrowRoundBack } from "react-icons/io";
import { approveOrder, cancelOrder, restoreOrder } from "../functions/firestore";
import { Alert } from "@mui/material";


type OrderDetailsProps = {
    currentOrder:OrderProps;
    setCurrentOrder: Dispatch<SetStateAction<OrderProps | null>>
}

const OrderDetails = ({currentOrder, setCurrentOrder}:OrderDetailsProps) => {
    const [feedback, setFeedback] = useState<FeedbackProps>({error:false, message:''});
    const [loading, setLoading] = useState<boolean>(false);
    const [currentFlight, setCurrentFlight] = useState<FlightDataProps>();
    const [showFlight, setShowFlight] = useState<boolean>(false);
    const [cancelMode, setCancelMode] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    useEffect(()=>{
        if(currentOrder && currentOrder.type === 'flight'){
            const unsub = onSnapshot(doc(db, "Flights", currentOrder.itemId), (doc) => {
                const data = {...doc.data(), id:doc.id} as FlightDataProps
                if(doc.exists()){
                    setCurrentFlight(data);
                }else{
                    setFeedback({error:true, message:'The flight has been deleted'})
                }
                // console.log("Current data: ", doc.data());
            });
            return ()=>{
                unsub();
            }
        }
    },[currentOrder])
    
    // console.log(currentOrder?.id)

    const handleCancelOrder = async(e:FormEvent)=>{
        e.preventDefault();
        if(message.trim() !== ''){
            try {
                setLoading(true)
                const cancelled = await cancelOrder(currentOrder?.userId, currentOrder?.id, message);
                if(cancelled){
                    setFeedback({error:false, message:'Order cancelled successfully'});
                    setCancelMode(false);
                }else{
                    setFeedback({error:true, message:'Error occured. Please retry'});
                }
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false)
            }

        }else{
            setFeedback({error:true, message:'Please enter a reason'});
        }
    }

    const handleRestoreOrder = async()=>{
            try {
                setLoading(true)
                const restored = await restoreOrder(currentOrder?.userId, currentOrder?.id, currentOrder?.title);
                if(restored){
                    setFeedback({error:false, message:'Order restored successfully'});
                }else{
                    setFeedback({error:true, message:'Error occured. Please retry'});
                }
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false)
            }        
    }

    const handleApproveOrder = async()=>{
            try {
                setLoading(true)
                const approved = await approveOrder(currentOrder?.userId, currentOrder?.id, currentOrder?.title);
                if(approved){
                    setFeedback({error:false, message:'Order approved successfully'});
                }else{
                    setFeedback({error:true, message:'Error occured. Please retry'});
                }
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false)
            }        
    }

  return (
    <div className="w-[90%] flex flex-col gap-4" >
        <div className="flex flex-row items-center">
            <IoIosArrowRoundBack
              onClick={() => setCurrentOrder(null)}
              size={30}
              className="cursor-pointer"
            />
            <span className="text-xl font-bold">{currentOrder?.title}</span>
        </div>
        <div className="flex p-4 pb-20 overflow-y-scroll overflow-x-hidden lg:overflow-y-hidden flex-col rounded gap-8 bg-slate-200 w-full">
            <div className="flex flex-col md:flex-row gap-8">

                <div className="flex flex-col gap-4">
                    <span className="font-semibold text-xl">User Information</span>
                    <div className="flex flex-col gap-0">
                        <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >{currentOrder?.type !== 'hotel'? 'Passport name':'Full name'}</span>
                        <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder?.fullname || currentOrder?.passport}</span>
                    </div>
                    {
                        currentOrder?.type !== 'hotel' &&
                        <div className="flex flex-col gap-0">
                            <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Passport number</span>
                            <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder?.passportNum}</span>
                        </div>
                    }
                    <div className="flex flex-col gap-0">
                        <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Email</span>
                        <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder?.email}</span>
                    </div>
                    <div className="flex flex-col gap-0">
                        <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Phone number</span>
                        <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder?.phone}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <span className="font-semibold text-xl">Booking Information</span>
                    <div className="flex flex-col gap-0">
                        <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Ordered</span>
                        <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder?.createdAt?.toDate()?.toDateString()}</span>
                    </div>
                    <div className="flex flex-col gap-0">
                        <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Status</span>
                        <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder?.status}</span>
                    </div>

                    {
                        currentOrder?.type !== 'flight' &&
                        <div className="flex flex-row gap-8">
                            <div className="flex flex-col gap-0">
                                <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >{currentOrder?.type !== 'hotel' ? 'Departure':'Check-in'}</span>
                                <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder.extras.checkin  ? new Date(currentOrder?.extras?.checkin).toDateString():''}</span>
                            </div>
                            <div className="flex flex-col gap-0">
                                <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >{currentOrder?.type !== 'hotel' ? 'Arrival':'Check-out'}</span>
                                <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder.extras.checkout ? new Date(currentOrder?.extras?.checkout).toDateString():''}</span>
                            </div>
                        </div>
                    }
                    
                    <div className="flex flex-col gap-0">
                        <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >{currentOrder?.type === 'flight' ? 'Trip type': 'Days'}</span>
                        <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder?.tip}</span>
                    </div>
                    {
                        currentOrder?.type === 'flight' &&
                        <div className="flex flex-col gap-0">
                            <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Passengers</span>
                            <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder?.extras?.passengers}</span>
                        </div>
                    }
                    

                    {
                        currentOrder?.type === 'hotel' &&
                        <div className="flex flex-row gap-8">
                            <div className="flex flex-col gap-0">
                                <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Adults</span>
                                <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder?.extras?.adults}</span>
                            </div>
                            <div className="flex flex-col gap-0">
                                <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Children</span>
                                <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentOrder?.extras?.children}</span>
                            </div>
                        </div>
                    }

                    <div className="flex flex-col gap-0">
                        <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Amount</span>
                        <span className="text-[0.9rem] md:text-[1rem] font-semibold" >${currentOrder?.extras.amount}</span>
                    </div>
                    {
                        currentOrder.type === 'flight' &&
                        <span onClick={()=>setShowFlight(e=>!e)} className="text-blue-500 underline cursor-pointer" >{showFlight?'Hide':'View'} flight details</span>
                    }

                    {
                        showFlight &&
                        <>
                        <div className="flex flex-row gap-8">
                            <div className="flex flex-col gap-0">
                                <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Departure Time</span>
                                <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentFlight?.departureTimestamps  ? formatDateAndTime(currentFlight?.departureTimestamps):''}</span>
                            </div>
                            <div className="flex flex-col gap-0">
                                <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >{currentFlight?.tripType === 'Multicity' && 'Final'} Arrival Time</span>
                                {
                                    currentFlight?.tripType === 'One Way' &&
                                    <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentFlight  && formatDateAndTime(currentFlight?.arrivalTimestamps)}</span>
                                }
                                {
                                    currentFlight?.tripType === 'Round Trip' &&
                                    <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentFlight  && formatDateAndTime(currentFlight?.secondArrivalTimestamps)}</span>
                                }
                                {
                                    currentFlight?.tripType === 'Multicity' &&
                                    <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentFlight  && formatDateAndTime(currentFlight?.thirdArrivalTimestamps)}</span>
                                }
                            </div>
                        </div>

                        <div className="flex flex-col gap-0">
                            <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Cities (in order)</span>
                            <span className="text-[0.9rem] md:text-[1rem] font-semibold" >{currentFlight?.departure +'  ➡️  '+ currentFlight?.arrival}  
                                {/* {(currentFlight?.tripType==='Round Trip' || currentFlight?.tripType === 'Multicity') && + ' => '} */}
                                {currentFlight?.tripType === 'Round Trip' && '  ➡️  '+ currentFlight?.departure}
                                {currentFlight?.tripType === 'Multicity' && '  ➡️  '+ currentFlight.secondArrival}
                                {currentFlight?.tripType === 'Multicity' && '  ➡️  '+ currentFlight.thirdArrival}
                            </span>
                        </div>
                        <div className="flex flex-col gap-0">
                            <span className="text-[0.8rem] text-slate-500 md:text-[0.9rem] font-semibold" >Price</span>
                            <span className="text-[0.9rem] md:text-[1rem] font-semibold" >${currentFlight?.price}</span>
                        </div>
                        </>
                    }



                </div>
            </div>
            {
                !cancelMode &&
                <div className="flex self-end flex-row items-center justify-center gap-4">
                   
                   {
                    currentOrder?.status !== 'Approved' &&
                    <button disabled={loading} onClick={currentOrder?.status === 'Cancelled' ?  handleRestoreOrder: handleApproveOrder} type='button' className="rounded-md bg-[#cb4900] hover:bg-orange-400 px-2 py-1 font-semibold text-white text-[0.8rem]" >{currentOrder?.status === 'Cancelled'?'Restore':'Approve'}</button>
                   }
                    {
                        currentOrder.status !== 'Cancelled' &&
                        <button type='button' className="rounded-md border border-slate-700 hover:bg-slate-200 px-2 py-1 font-semibold text-slate-600 text-[0.8rem]" onClick={()=>setCancelMode(true)} >Cancel</button>
                    }
                </div>
            }
            
            {
                cancelMode &&
                <form onSubmit={handleCancelOrder} className='w-full flex flex-col gap-4' >
                    <textarea onChange={(e)=>setMessage(e.target.value)} required placeholder='Let the user know why you want to cancel this order' className='w-full py-2 px-4 border border-slate-700 rounded-lg outline-none bg-transparent' rows={5} />
                    <div className="flex self-end flex-row items-center justify-center gap-4">
                        <button type='submit' disabled={loading} className="rounded-md bg-[#cb4900] hover:bg-orange-400 px-2 py-1 font-semibold text-white text-[0.8rem]" >{loading?'loading...':'Submit'}</button>
                        <button type='button' className="rounded-md border border-slate-700 hover:bg-slate-200 px-2 py-1 font-semibold text-slate-600 text-[0.8rem]" onClick={()=>setCancelMode(false)} >Close</button>
                    </div>
                </form>
            }

            {
                feedback.message &&
                <Alert onClose={()=>setFeedback({error:false, message:''})} severity={feedback.error?'error':'success'} >{feedback.message}</Alert>
            } 

        </div>
    </div>
  )
}

export default OrderDetails