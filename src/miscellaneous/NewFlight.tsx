import { Alert, Modal } from '@mui/material'
import React, {    useRef, useState } from 'react'
import { FlightDataProps } from '../types/Types'
// import { CiImageOn } from "react-icons/ci";
// import { FaPlus } from "react-icons/fa6";
import { calcMinDate,  formatFirebaeDateAndTime } from '../functions/Dates';
import { FeedbackProps } from '../assets/types/Types';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
// import axios from 'axios'
// import { API } from '../constants/Constants'

type NewProps = {
    currentData:FlightDataProps | null;
    setCurrentData: React.Dispatch<React.SetStateAction<FlightDataProps | null>>;
    setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
    isNew: boolean;
}


const NewFlight = ({currentData, setCurrentData, isNew, setIsNew}:NewProps) => {
    const [depDate, setDepDate] = useState<string>('');
    const [arrDate, setArrDate] = useState<string>('');
    const [retDate, setRetDate] = useState<string>('');
    const [secondDate, setSecondDate] = useState<string>('');
    const [thirdDate, setThirdDate] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(0);
    const [departure, setDeparture] = useState<string>('');
    const [arrival, setArrival] = useState<string>('');
    const [secondArrival, setSecondArrival] = useState<string>('');
    const [thirdArrival, setThirdArrival] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [feedback, setFeedback] = useState<FeedbackProps>({error:false, message:''});
    const [tripType, setTripType] = useState<string>('One Way');
    const formRef = useRef<HTMLFormElement>(null);

    
    
    const handleClose = ()=>{
        setCurrentData(null);
        setIsNew(false);
    }
 

    const addFlight = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setFeedback({error:false, message:''});

        try {
            setLoading(true);
            const data = {
                name, 
                tripType, 
                price, 
                departure,
                departureTimestamps:depDate,
                arrival,
                arrivalTimestamps:arrDate,
                secondArrival,
                secondArrivalTimestamps:secondDate,
                thirdArrival,
                thirdArrivalTimestamps:thirdDate,
                retturn:departure,
                retturnTimestamps:retDate,
                image,
                description:'',
                createdAt:serverTimestamp()
            }
            await addDoc(collection(db, 'Flights'), data);
            setFeedback({error:false, message:'Flight added successfully'});
            formRef.current?.reset();
        } catch (error) {
            console.log(error);
            setFeedback({error:true, message:'Error occured. Please retry'});
        }finally{
            setLoading(false);
        }
        
    }


    const updateFlight = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setFeedback({error:false, message:''});

        try {
            setLoading(true);
            const data = {
                name:name || currentData?.name, 
                tripType: tripType || currentData?.tripType, 
                price:price || currentData?.price, 
                departure:departure || currentData?.departure,
                departureTimestamps:depDate || currentData?.departureTimestamps,
                arrival:arrival || currentData?.arrival,
                arrivalTimestamps:arrDate || currentData?.arrivalTimestamps,
                secondArrival:secondArrival || currentData?.secondArrival,
                secondArrivalTimestamps:secondDate || currentData?.secondArrivalTimestamps,
                thirdArrival:thirdArrival || currentData?.thirdArrival,
                thirdArrivalTimestamps:thirdDate || currentData?.thirdArrivalTimestamps,
                retturn:departure || currentData?.retturn,
                retturnTimestamps:retDate || currentData?.retturnTimestamps,
                image:image || currentData?.image,
                description:'',
                createdAt:serverTimestamp()
            }
            currentData && await updateDoc(doc(db, 'Flights', currentData?.id), data);
            setFeedback({error:false, message:'Flight updated successfully'});
            formRef.current?.reset();
        } catch (error) {
            console.log(error);
            setFeedback({error:true, message:'Error occured. Please retry'});
        }finally{
            setLoading(false);
        }
        
    }

  return (
    <Modal
  open={(currentData !== null) || isNew}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
 <div onClick={()=>{}} className="flex cursor-pointer w-full pb-20 lg:pb-10 pt-10 h-screen items-center justify-center">
 <div className="flex w-[90%] xl:w-5/6 p-4 rounded-xl h-full overflow-y-scroll  overflow-x-hidden z-10 cursor-default bg-white flex-col gap-4 items-center">
    <span className="text-2xl font-semibold self-start">Add new flight</span>
    <form ref={formRef} onSubmit={ currentData ? updateFlight : addFlight } className="flex flex-col gap-4 bg-[#F8F8F8] w-full rounded-2xl px-4 grow">
        <div className="flex flex-col  w-full py-8 lg:flex-row lg:items-start lg:justify-between gap-4 items-center">

        <div className="flex w-full lg:flex-1 flex-col gap-4 lg:gap-8 mt-4 lg:mt-0 items-center md:items-start">
                <span className="font-semibold text-xl lg:text-2xl">
                  Image
                </span>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">
                      Add an image of the airline
                    </span>
                    <textarea
                      defaultValue={currentData?.image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2"
                      rows={5}
                      placeholder="Insert the image link here"
                    />
                  </div>
                </div>
              </div>

            <div className="flex w-full lg:flex-1 flex-col gap-4 lg:gap-8 mt-4 lg:mt-0 items-center md:items-start">
                <span className='font-semibold text-xl lg:text-2xl' >Flight Information</span>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Flight name</span>
                        <input defaultValue={currentData?.name} required onChange={(e)=>setName(e.target.value)} className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type="text" placeholder='type here' />
                    </div>
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Type</span>
                        <select onChange={(e)=>setTripType(e.target.value)} title='select type' defaultValue='One Way' className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' name="type" id="type">
                            <option value="">{currentData?currentData.tripType : '--select--'}</option>
                            <option defaultChecked defaultValue='One Way' value="One Way">One Way</option>
                            <option value="Round Trip">Round Trip</option>
                            <option value="Multicity">Multicity</option>
                        </select>
                        
                    </div>
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Price</span>
                        <input defaultValue={currentData?.price} required  onChange={(e)=>setPrice(parseFloat(e.target.value))} step='any' className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type="number" placeholder='$' />
                    </div>
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Departure</span>
                        <input defaultValue={currentData?.departure} required onChange={(e)=>setDeparture(e.target.value)} className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type='text'  placeholder='enter city' />
                    </div>
                    
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Departure Time</span>
                        <input defaultValue={currentData ? formatFirebaeDateAndTime(currentData?.departureTimestamps):''} required min={calcMinDate()} value={depDate} onChange={(e)=>setDepDate(e.target.value)}  className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type='datetime-local'  placeholder='date-time' />
                    </div>
                    
                </div>
            </div>


            <div className="flex w-full lg:flex-1 flex-col gap-4">
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Arrival</span>
                        <input defaultValue={currentData?.arrival} required onChange={(e)=>setArrival(e.target.value)} className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type='text'  placeholder='enter city' />
                    </div>
                    
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Arrival Time</span>
                        <input defaultValue={currentData ? formatFirebaeDateAndTime(currentData?.arrivalTimestamps):''} required min={calcMinDate()} value={arrDate} onChange={(e)=>setArrDate(e.target.value)}  className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type='datetime-local'  placeholder='date-time' />
                    </div>
                    
                    {
                        tripType === 'Round Trip' &&
                        <div className="flex w-full flex-col">
                            <span className="text-[0.rem] text-[grey]">Returning Time</span>
                            <input defaultValue={currentData ? formatFirebaeDateAndTime(currentData?.retturnTimestamps):''} required={tripType === 'Round Trip'} min={calcMinDate()} value={retDate} onChange={(e)=>setRetDate(e.target.value)}  className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type='datetime-local'  placeholder='date-time' />
                        </div>
                    }
                    {
                        tripType === 'Multicity' &&
                        <>
                        <div className="flex w-full flex-col">
                            <span className="text-[0.rem] text-[grey]">2nd Arrival</span>
                            <input defaultValue={currentData?.secondArrival} onChange={(e)=>setSecondArrival(e.target.value)} required = {tripType === 'Multicity'} className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type='text'  placeholder='enter city' />
                        </div>
                        
                        <div className="flex w-full flex-col">
                            <span className="text-[0.rem] text-[grey]">2nd Arrival Time</span>
                            <input defaultValue={currentData ? formatFirebaeDateAndTime(currentData?.secondArrivalTimestamps):''} required = {tripType === 'Multicity'} min={calcMinDate()} value={secondDate} onChange={(e)=>setSecondDate(e.target.value)}  className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type='datetime-local'  placeholder='date-time' />
                        </div>
                        <div className="flex w-full flex-col">
                            <span className="text-[0.rem] text-[grey]">3rd Arrival</span>
                            <input defaultValue={currentData?.thirdArrival} onChange={(e)=>setThirdArrival(e.target.value)} required = {tripType === 'Multicity'} className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type='text'  placeholder='enter city' />
                        </div>
                        
                        <div className="flex w-full flex-col">
                            <span className="text-[0.rem] text-[grey]">3rd Arrival Time</span>
                            <input defaultValue={currentData ? formatFirebaeDateAndTime(currentData?.thirdArrivalTimestamps):''} required = {tripType === 'Multicity'} min={calcMinDate()} value={thirdDate} onChange={(e)=>setThirdDate(e.target.value)}  className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type='datetime-local'  placeholder='date-time' />
                        </div>
                        </>
                    }
               
            </div>
        </div>

        {feedback.message && (
              <Alert
                onClose={() => setFeedback({ error: false, message: "" })}
                severity={feedback.error ? "error" : "success"}
              >
                {feedback.message}
              </Alert>
            )}
        <div className="flex w-full flex-row items-center justify-end gap-4">
            <button onClick={handleClose} type='button' className='border-2 border-[#cb4900] px-4 py-2 rounded-lg text-[#cb4900]' >Back</button>
            <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "bg-slate-300" : "bg-[#cb4900]"
                } px-4 py-2 rounded-lg text-white`}
              >
                {currentData? 'Update Flight':'Add Flight'}
              </button>
        </div>

    </form>
</div> 
 </div>
</Modal>
  )
}

export default NewFlight