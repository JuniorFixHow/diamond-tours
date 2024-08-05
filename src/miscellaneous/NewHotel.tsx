import { Alert, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { HotelDataProps } from '../types/Types'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FeedbackProps } from '../assets/types/Types';
// import axios from 'axios'
// import { API } from '../constants/Constants'

type NewProps = {
    currentData:HotelDataProps | null;
    setCurrentData: React.Dispatch<React.SetStateAction<HotelDataProps | null>>;
    setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
    isNew: boolean;
}


const NewHotel = ({currentData, setCurrentData, isNew, setIsNew}:NewProps) => {
    const [location, setLocation] = useState<string>('');
    const [rating, setRating] = useState<number>(1);
    const [price, setPrice] = useState<number>(0);
    const [cprice, setCPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [photos, setPhotos] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [featured, setFeatured] = useState<boolean>(false);
    const [discount, setDiscount] = useState<number>(0);

    const [feedback, setFeedback] = useState<FeedbackProps>({error:false, message:''});
    const formRef = useRef<HTMLFormElement>(null);
  
    useEffect(()=>{
      if(currentData){
        setFeatured(currentData?.featured);
      }
    },[currentData])

    const handleClose = ()=>{
        setCurrentData(null);
        setIsNew(false);
    }

    const addHotel = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setFeedback({error:false, message:''});
        if (
          name.trim() !== "" &&
          location.trim() !== "" &&
          price !== 0 &&
          cprice !== 0 &&
          photos.trim() !== "" &&
          description.trim() !== ''
          
        ) {
          try {
            setLoading(true);
            const data = {
             name, location, rating, featured, adultPrice:price,
             childPrice:cprice, photos, discount,
              favourites:[], description, createdAt:serverTimestamp()
            };
            await addDoc(collection(db, "Hotels"), data);
            formRef.current?.reset();
            setFeedback({ error: false, message: "Hotel Added Successfully" });
          } catch (error) {
            console.log(error);
            setFeedback({
              error: true,
              message: "Error occured. Please retry",
            });
          } finally {
            setLoading(false);
          }
        }else{
            setFeedback({error:true, message:'All fields are required'});
            setLoading(false);
        }
    }
    const updateHotel = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setFeedback({error:false, message:''});
       
        try {
          setLoading(true);
          const data = {
           featured,
           name:name||currentData?.name, 
           discount:discount > 0 ? discount : currentData?.discount, 
           location:location||currentData?.location, 
           rating:rating > 1 ? rating : currentData?.rating, 
           adultPrice:price || currentData?.adultPrice,
           childPrice:cprice || currentData?.childPrice, 
           photos:photos || currentData?.photos,
            favourites:currentData?.favourites, 
            description:description||currentData?.description, 
            createdAt:serverTimestamp()
          };
          // console.log(data)
          currentData && await updateDoc(doc(db, "Hotels", currentData?.id), data);
          formRef.current?.reset();
          setFeedback({ error: false, message: "Hotel updated Successfully" });
        } catch (error) {
          console.log(error);
          setFeedback({
            error: true,
            message: "Error occured. Please retry",
          });
        } finally {
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
 <div onClick={()=>{}} className="flex cursor-pointer pb-20 lg:pb-10 pt-10 w-full h-screen items-center justify-center">
 <div className="flex w-[90%] xl:w-5/6 p-4 rounded-xl h-full overflow-y-scroll  overflow-x-hidden z-10 cursor-default bg-white flex-col gap-4 items-center">
    <span className="text-2xl font-semibold self-start">Add new hotel</span>
    <form ref={formRef} onSubmit={currentData ? updateHotel : addHotel} className="flex flex-col gap-4 bg-[#F8F8F8] w-full rounded-2xl px-4 grow">
        <div className="flex flex-col  w-full py-8 lg:flex-row lg:items-start lg:justify-between gap-4 items-center">

            <div className="flex w-full lg:flex-1 flex-col gap-4 lg:gap-8 mt-4 lg:mt-0 items-center md:items-start">
                <span className="font-semibold text-xl lg:text-2xl">
                  Photos
                </span>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">
                      Add at least 5 photos
                    </span>
                    <textarea
                      defaultValue={currentData?.photos}
                      onChange={(e) => setPhotos(e.target.value)}
                      className="w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2"
                      rows={10}
                      placeholder="insert image link, press comma then proceed with another link. It is recommended to add at least 5 images"
                    />
                  </div>

                  <div className="flex w-full flex-row gap-4 items-center">
                    <span className="text-[0.rem] text-[grey]">Featured</span>
                    <input
                      onClick={() => setFeatured(pre => !pre)}
                      checked={featured}
                      className="bg-transparent cursor-pointer px-3 rounded-md border border-[grey] outline-none py-2"
                      type='checkbox'
                      placeholder="type here"
                    />
                  </div>

                </div>
            </div>

            <div className="flex w-full lg:flex-1 flex-col gap-4 lg:gap-8 mt-4 lg:mt-0 items-center md:items-start">
                <span className='font-semibold text-xl lg:text-2xl' >Hotel Information</span>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Site name</span>
                        <input defaultValue={currentData?.name} onChange={(e)=>setName(e.target.value)} className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type="text" placeholder='type here' />
                    </div>
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Location</span>
                        <input defaultValue={currentData?.location} onChange={(e)=>setLocation(e.target.value)} className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type="text" placeholder='eg.Accra, Ghana' />
                    </div>
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Rating</span>
                        <input defaultValue={currentData?.rating} step={0.1} onChange={(e)=>setRating(parseFloat(e.target.value))} className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type="number" min={1} max={5} placeholder='rate' />
                    </div>
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Discount (%) </span>
                        <input defaultValue={currentData?.discount} step={0.0001} onChange={(e)=>setDiscount(parseFloat(e.target.value))} className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' type="number" min={0} max={100} placeholder='%' />
                    </div>
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Hotel description</span>
                        <textarea defaultValue={currentData?.description} onChange={(e)=>setDescription(e.target.value)} className='w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2' rows={5} placeholder='type here' />
                    </div>
                </div>
            </div>


            <div className="flex w-full lg:flex-1 flex-col gap-8">
                <div className="flex flex-row gap-4 w-full">
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[#7c7878]">Adult's price</span>
                        <input defaultValue={currentData?.adultPrice} step='any' onChange={(e)=>setPrice(parseFloat(e.target.value))} min={0}  className='w-32 bg-transparent  rounded-md border border-[grey] outline-none py-2' type='number' placeholder='adults' />
                    </div>
                    <div className="flex w-full flex-col">
                        <span className="text-[0.rem] text-[grey]">Children's price</span>
                        <input defaultValue={currentData?.childPrice} step='any' onChange={(e)=>setCPrice(parseFloat(e.target.value))} min ={0}   className='w-32 bg-transparent  rounded-md border border-[grey] outline-none py-2' type='number' placeholder='children' />
                    </div>
                   
                    
                </div>
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
            <button type='submit' disabled={loading} className={`${loading?'bg-slate-300':'bg-[#cb4900]'} px-4 py-2 rounded-lg text-white` }>{currentData ? 'Update Hotel':'Add Hotel'}</button>
        </div>

    </form>
</div> 
 </div>
</Modal>
  )
}

export default NewHotel