import { IoTrashBinOutline } from "react-icons/io5";
import { BookingsProps, FeedBackPops } from "../types/Types";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../data/Constats";
import { Alert } from "@mui/material";
import { useAuth } from "@clerk/clerk-react"

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingsProps[]>([]);
  const [feedback, setFeedback] = useState<FeedBackPops>({error:false, message:''});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | undefined>('');

  const {userId, isSignedIn} = useAuth();

  useEffect(()=>{
    const fetchData = async()=>{
      if(isSignedIn){
        try {
          const res = await axios.get(`${API}bookings/${userId}`);
          if(res.data){
            setBookings(res.data);
          }  
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData();
  },[bookings, isSignedIn, userId])

  const deleteBooking = async(id:string | undefined)=>{
    setIsLoading(true);
    setCurrentId(id)
    setFeedback({error:false, message:''})
    try {
      await axios.delete(`${API}bookings/${id}`);
      setFeedback({error:false, message:"Appointment Cancelled!"});
    } catch (error) {
      console.log(error);
      setFeedback({error:true, message:"Error occured. Please Retry"})
    }finally{
      setIsLoading(false);
      // setCurrentId('');
    }
  }
  // if(bookings.length <= 0){
  //   return;
  // }

  return (
    <section className="w-full scroll-mt-14 bg-white py-8 flex flex-col items-center justify-center gap-6" id='bookings' >
      {
        feedback.message &&
        <Alert onClose={()=>setFeedback({error:false, message:''})} className="fixed top-16 self-center w-5/6 lg:w-1/2" severity={feedback.error? 'error':'success'} variant='standard' >{feedback.message}</Alert>
      }
      <h2 className="text-black text-center text-2xl sm:text-3xl font-bold" ><span className="text-[#CB4900]" >Appointments</span> Scheduled</h2>
      <div className="flex flex-col w-5/6 lg:grid lg:grid-cols-2 lg:place-items-center justify-center items-center gap-6">
        {
          bookings?.length >0  ?
          bookings.sort((a, b)=> new Date(a?.date)> new Date(b?.date) ?1:-1).map((item: BookingsProps)=>(
            <div key={item?._id} className="bg-white hover:bg-slate-300 shadow-2xl rounded-xl p-4 flex flex-col gap-4 lg:gap-2 w-full ">
              <span className="text-[1rem] md:text-xl font-semibold text-[#cb4900]" >{item?.service}</span>
              <span className="text-[1rem] md:text-xl font-medium" >{item?.package}</span>
              <span className={`text-[1rem] md:text-xl font-medium ${item.status === 'Pending'?'text-red-400':'text-green-500'}`} >{item?.status}</span>
              <div className="flex flex-row w-full justify-between items-center">
                <span className="text-[1rem] md:text-xl font-medium italic" >{item?.date && new Date(item?.date).toLocaleDateString()}</span>
                {
                  (isLoading && currentId === item?._id) ?
                  null:
                  <IoTrashBinOutline onClick={()=>deleteBooking(item?._id)} color="crimson" className="cursor-pointer" size={20} />
                }
              </div>
            </div>
          ))
          :
          <span className="text-xl text-CgEnter font-bold text-slate-500">Your booked appointments will show up here.</span>
        }
      </div>
    </section>
  )
}

export default Bookings