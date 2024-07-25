/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
// import AppCard from "../miscellaneous/AppCard";
import Header from "../miscellaneous/Header"
import { IoIosArrowRoundBack } from "react-icons/io";
import { BookingsProps,  FeedbackProps,  PageProp } from "../assets/types/Types";
import axios from "axios";
import { API } from "../common/contants";
import  {Alert}  from "@mui/material";
import { FlightData, HotelData, TourData } from "../utils/DummyData";
import { FlightProps, HotelProps, ToursProps } from "../types/Types";
import { formatDateAndTime } from "../functions/Dates";


const Orders = ({setCurrentPage}:PageProp) => {
    const [cancelMode, setCancelMode] = useState<boolean>(false);
    const [tours, setTours] =useState<BookingsProps[]>([]);
    const [hotels, setHotels] =useState<BookingsProps[]>([]);
    const [flights, setFlights] =useState<BookingsProps[]>([]);
    const [viewMode, setViewMode] =useState<string>('tours');
    const [currentTour, setCurrentTour] = useState<ToursProps | null>();
    const [currentHotel, setCurrentHotel] = useState<HotelProps | null>();
    const [currentFlight, setCurrentFlight] = useState<FlightProps | null>();
    // const [currentApp, setCurrentApp] = useState<BookingsProps>();
    // const [currentApp, setCurrentApp] = useState<BookingsProps>();
    const [feedback, setFeedback] = useState<FeedbackProps>({error:false, message:''});
    const [tourReason, setTourReason] = useState<string>('');
    const [hotelReason, setHotelReason] = useState<string>('');
    const [flightReason, setFlightReason] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const formRef = useRef<HTMLFormElement | null>(null);

    // useEffect(()=>{
    //     const fetchData = async()=>{
    //         try {
    //           const pen = await axios.get(`${API}bookings`);
    //           if(pen.data){
    //             setTours(pen.data.filter((item:BookingsProps)=>(item.status==='Pending') && new Date() < new Date(item.date)));
    //             setHotels(pen.data.filter((item:BookingsProps)=>(item.status==='Approved') && new Date() < new Date(item.date)));
    //             setFlights(pen.data.filter((item:BookingsProps)=> new Date() > new Date(item.date)));
    //           }  
    //         } catch (error) {
    //           console.log(error)
    //         }
         
    //     }
    //     fetchData();
    //   },[tours, hotels, flights])


    //   const sendReason = async(e:React.FormEvent<HTMLFormElement>, book: BookingsProps)=>{
    //     e.preventDefault();
    //     setIsLoading(true);
    //     setFeedback({error:false, message:''});
    //     if(reason.trim() !== ''){
    //       try {
    //         const data = {email:book.email, name:book.fullname.first, message:reason};
    //         const res = await axios.post(`${API}messages/admin/${book._id}`, data)
    //         if(res.status === 200){
    //           setFeedback({error:false, message:'Operation successful'})
    //           setReason('');
    //           formRef.current?.reset();
    //         }
    //       } catch (error) {
    //         console.log(error)
    //       }finally{
    //         setIsLoading(false);
    //       }
    //     }
    //   }

      const handleCancelTour = (app:ToursProps)=>{
        setCurrentTour(app);
        setCancelMode(true)
      }
      const handleTourCancelCancel = ()=>{
        setCurrentTour(null);
        setCancelMode(false)
      }

      //hotels
      const handleCancelHotel = (app:HotelProps)=>{
        setCurrentHotel(app);
        setCancelMode(true)
      }
      const handleHotelCancelCancel = ()=>{
        setCurrentHotel(null);
        setCancelMode(false)
      }

      //flights
      const handleCancelFlight = (app:FlightProps)=>{
        setCurrentFlight(app);
        setCancelMode(true)
      }
      const handleFlightCancelCancel = ()=>{
        setCurrentFlight(null);
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

    
    
    const handleTours = ()=>{
        setCurrentTour(null);
        setCurrentHotel(null);
        setCurrentFlight(null);
        setViewMode("tours");
        setCancelMode(false);
        setTourReason('');
        setSearch('');
    }
    const handleHotels = ()=>{
        setCurrentTour(null);
        setCurrentHotel(null);
        setCurrentFlight(null);
        setViewMode("hotels");
        setCancelMode(false);
        setHotelReason('');
        setSearch('');
    }
    const handleFlight = ()=>{
        setCurrentTour(null);
        setCurrentHotel(null);
        setCurrentFlight(null);
        setViewMode("flights");
        setCancelMode(false);
        setFlightReason('');
        setSearch('');
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
          <h2 className="font-semibold text-xl md:text-2xl">Orders</h2>
        </div>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="search ...." className="w-full px-3 py-2 border border-slate-200 outline-none rounded-md" />
        <div className="flex flex-col gap-4 w-[90%] justify-center items-center">
          <div className="flex flex-row justify-center md:justify-around w-full gap-4">
            <span
              onClick={handleTours}
              className={`text-[1rem] ${
                viewMode === "tours" ? "text-[#cb4900]" : "text-black"
              } md:text-xl md:hover:bg-slate-100 hover:px-2 font-semibold cursor-pointer`}
            >
              Tours
            </span>
            <span
              onClick={handleHotels}
              className={`text-[1rem] ${
                viewMode === "hotels" ? "text-[#cb4900]" : "text-black"
              } md:text-xl md:hover:bg-slate-100 hover:px-2 font-semibold cursor-pointer`}
            >
              Hotels
            </span>
            <span
              onClick={handleFlight}
              className={`text-[1rem] ${
                viewMode === "flights" ? "text-[#cb4900]" : "text-black"
              } md:text-xl md:hover:bg-slate-100 hover:px-2 font-semibold cursor-pointer`}
            >
              Flights
            </span>
          </div>
        </div>
        <hr className="w-full bg-slate-700" />
        <div className="w-full flex flex-col gap-8 items-center pb-10">
          {
            (TourData.length > 0 && viewMode === 'tours')?
            TourData
            .filter((item:ToursProps)=>{
                return search === '' ? item : Object.values(item)
                  .join(' ')
                  .toLowerCase()
                  .includes(search.toLowerCase())
              })
            .map((item:ToursProps)=>(

              <div key={item?.id} className='flex flex-col p-6 bg-white shadow-xl rounded-xl md:rounded-2xl w-full lg:w-[90%] gap-4'>
                <span className='text-[1rem] font-semibold text-right'>{new Date(item?.timestamp).toLocaleString(navigator.language, {
                            dateStyle: 'short',
                            timeStyle: 'short',
                        })}</span>
                <div className='flex flex-col gap-3'>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Tour: <span className='font-normal'>{item?.title}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Days: <span className='font-normal'>{item?.description.slice(0,10)}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Name: <span className='font-normal'>{item?.name}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Email: <span className='font-normal'>{item?.email}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Phone: <span className='font-normal'>{item?.phone}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Passport Number: <span className='font-normal'>{item?.passportNumber}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Status: <span className='font-normal'>{item?.status}</span> </span>
                </div>
                {
                  (!cancelMode && currentTour?.id !== item?.id) &&
                  <div className="flex w-full flex-row items-center justify-between">
                    <button onClick={()=>onConfirm(item?.id)} type='button' className='bg-[#cb4900] px-3 py-1 rounded-full text-white text-[0.8rem] md:text-[0.9rem] hover:bg-orange-400' >Confirm</button>
                    <button onClick={()=>handleCancelTour(item)} type='button' className='border self-end border-slate-500 px-3 py-1 rounded-full text-black text-[0.8rem] md:text-[0.9rem] hover:bg-slate-100' >Cancel</button>
                  </div>
                }
                {
                  (cancelMode && currentTour?.id === item?.id) &&
                  <form ref={formRef} className='w-full flex flex-col gap-2' onSubmit={(e)=>{}} >
                    <textarea required onChange={(e)=>setTourReason(e.target.value)} className='w-full p-2 border border-slate-400 rounded-2xl outline-none placeholder:italic' rows={5} placeholder="Let the client know why you are cancelling their appointment" />
                    <div className="flex  self-end items-center justify-center gap-4">
                      <button onClick={handleTourCancelCancel} type='button' className='border self-end border-slate-500 px-3 py-1 rounded-full text-black text-[0.8rem] md:text-[0.9rem] hover:bg-slate-100' >Cancel</button>
                      <button disabled={isLoading} type='submit' className={`bg-[#cb4900] w-fit px-6 py-1 rounded-xl text-white text-[0.8rem] md:text-[0.9rem] hover:bg-orange-400 ${isLoading?'bg-orange-200 cursor-default':'bg-[#cb4900] cursor-pointer'}`} >{isLoading?'Loading...':'Proceed'}</button>
                    </div>
                  </form>
                }
              </div>
            )):
            (HotelData.length > 0 && viewMode === 'hotels')?
            HotelData
            .filter((item:HotelProps)=>{
                return search === '' ? item : Object.values(item)
                  .join(' ')
                  .toLowerCase()
                  .includes(search.toLowerCase())
              })
            .map((item:HotelProps)=>(

              <div key={item?.id} className='flex flex-col p-6 bg-white shadow-xl rounded-xl md:rounded-2xl w-full lg:w-[90%] gap-4'>
                {/* <span className='text-[1rem] font-semibold text-right'>{new Date(item?.timestamp).toLocaleString(navigator.language, {
                            dateStyle: 'short',
                            timeStyle: 'short',
                        })}</span> */}
                <div className='flex flex-col gap-3'>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Tour: <span className='font-normal'>{item?.title}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Days: <span className='font-normal'>{item?.description.slice(0,10)}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Name: <span className='font-normal'>{item?.name}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Email: <span className='font-normal'>{item?.email}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Phone: <span className='font-normal'>{item?.phone}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Adults: <span className='font-normal'>{item?.adults}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Children: <span className='font-normal'>{item?.children}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Check-in Date: <span className='font-normal'>{item?.checkinDate}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Check-out Date: <span className='font-normal'>{item?.checkoutDate}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Price: <span className='font-normal'>{item?.price}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Status: <span className='font-normal'>{item?.status}</span> </span>
                </div>
                {
                  (!cancelMode && currentHotel?.id !== item?.id) &&
                  <div className="flex w-full flex-row items-center justify-between">
                    <button onClick={()=>onConfirm(item?.id)} type='button' className='bg-[#cb4900] px-3 py-1 rounded-full text-white text-[0.8rem] md:text-[0.9rem] hover:bg-orange-400' >Confirm</button>
                    <button onClick={()=>handleCancelHotel(item)} type='button' className='border self-end border-slate-500 px-3 py-1 rounded-full text-black text-[0.8rem] md:text-[0.9rem] hover:bg-slate-100' >Cancel</button>
                  </div>
                }
                {
                  (cancelMode && currentHotel?.id === item?.id) &&
                  <form ref={formRef} className='w-full flex flex-col gap-2' onSubmit={(e)=>{}} >
                    <textarea required onChange={(e)=>setHotelReason(e.target.value)} className='w-full p-2 border border-slate-400 rounded-2xl outline-none placeholder:italic' rows={5} placeholder="Let the client know why you are cancelling their appointment" />
                    <div className="flex  self-end items-center justify-center gap-4">
                      <button onClick={handleHotelCancelCancel} type='button' className='border self-end border-slate-500 px-3 py-1 rounded-full text-black text-[0.8rem] md:text-[0.9rem] hover:bg-slate-100' >Cancel</button>
                      <button disabled={isLoading} type='submit' className={`bg-[#cb4900] w-fit px-6 py-1 rounded-xl text-white text-[0.8rem] md:text-[0.9rem] hover:bg-orange-400 ${isLoading?'bg-orange-200 cursor-default':'bg-[#cb4900] cursor-pointer'}`} >{isLoading?'Loading...':'Proceed'}</button>
                    </div>
                  </form>
                }
              </div>
            )):

            (FlightData.length > 0 && viewMode === 'flights')?
            FlightData
            .filter((item:FlightProps)=>{
                return search === '' ? item : Object.values(item)
                  .join(' ')
                  .toLowerCase()
                  .includes(search.toLowerCase())
              })
            .map((item:FlightProps)=>(

              <div key={item?.id} className='flex flex-col p-6 bg-white shadow-xl rounded-xl md:rounded-2xl w-full lg:w-[90%] gap-4'>
                <span className='text-[1rem] font-semibold text-right'>{item.timestamp && formatDateAndTime(item.timestamp)}</span>
                <div className='flex flex-col gap-3'>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Flight: <span className='font-normal'>{item?.title}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Trip Type: <span className='font-normal'>{item?.type}</span> </span>
                  {
                    item.type === 'Multicity' &&
                    <span className='font-bold text-[0.9rem] md:text-xl' >Loactions: {item.cities.map((city:string)=>(<span className='font-normal'>{city}{' '}</span>))} </span>
                  }
                  <span className='font-bold text-[0.9rem] md:text-xl' >Name: <span className='font-normal'>{item?.name}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Email: <span className='font-normal'>{item?.email}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Phone: <span className='font-normal'>{item?.phone}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Passport Number: <span className='font-normal'>{item?.passportNumber}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Passengers: <span className='font-normal'>{item?.passengers}</span> </span>
                  {
                    item.type !== 'Multicity' &&
                    <>
                    <span className='font-bold text-[0.9rem] md:text-xl' >From: <span className='font-normal'>{item?.from}</span> </span>
                    <span className='font-bold text-[0.9rem] md:text-xl' >To: <span className='font-normal'>{item?.to}</span> </span>
                    </>
                  }
                  <span className='font-bold text-[0.9rem] md:text-xl' >Departure Time: <span className='font-normal'>{formatDateAndTime(item?.departureDateAndTime)}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Arrival Time: <span className='font-normal'>{formatDateAndTime(item?.arrivalDateAndTime)}</span> </span>
                  {
                    item.type === 'Round Trip' &&
                    <>
                    <span className='font-bold text-[0.9rem] md:text-xl' >Return Departure Time: <span className='font-normal'>{formatDateAndTime(item?.reurntDepartureDateAndTime)}</span> </span>
                    <span className='font-bold text-[0.9rem] md:text-xl' >Return Arrival Time: <span className='font-normal'>{formatDateAndTime(item?.returnArrivalDateAndTime)}</span> </span>
                    </>
                  }
                  <span className='font-bold text-[0.9rem] md:text-xl' >Price: <span className='font-normal'>{item?.price}</span> </span>
                  <span className='font-bold text-[0.9rem] md:text-xl' >Status: <span className='font-normal'>{item?.status}</span> </span>
                </div>
                {
                  (!cancelMode && currentHotel?.id !== item?.id) &&
                  <div className="flex w-full flex-row items-center justify-between">
                    <button onClick={()=>onConfirm(item?.id)} type='button' className='bg-[#cb4900] px-3 py-1 rounded-full text-white text-[0.8rem] md:text-[0.9rem] hover:bg-orange-400' >Confirm</button>
                    <button onClick={()=>handleCancelFlight(item)} type='button' className='border self-end border-slate-500 px-3 py-1 rounded-full text-black text-[0.8rem] md:text-[0.9rem] hover:bg-slate-100' >Cancel</button>
                  </div>
                }
                {
                  (cancelMode && currentHotel?.id === item?.id) &&
                  <form ref={formRef} className='w-full flex flex-col gap-2' onSubmit={(e)=>{}} >
                    <textarea required onChange={(e)=>setFlightReason(e.target.value)} className='w-full p-2 border border-slate-400 rounded-2xl outline-none placeholder:italic' rows={5} placeholder="Let the client know why you are cancelling their appointment" />
                    <div className="flex  self-end items-center justify-center gap-4">
                      <button onClick={handleFlightCancelCancel} type='button' className='border self-end border-slate-500 px-3 py-1 rounded-full text-black text-[0.8rem] md:text-[0.9rem] hover:bg-slate-100' >Cancel</button>
                      <button disabled={isLoading} type='submit' className={`bg-[#cb4900] w-fit px-6 py-1 rounded-xl text-white text-[0.8rem] md:text-[0.9rem] hover:bg-orange-400 ${isLoading?'bg-orange-200 cursor-default':'bg-[#cb4900] cursor-pointer'}`} >{isLoading?'Loading...':'Proceed'}</button>
                    </div>
                  </form>
                }
              </div>
            )):

        
            

            <h2>There are no orders here yet</h2>
          }
          
        </div>
      </div>
    </section>
  );
}

export default Orders