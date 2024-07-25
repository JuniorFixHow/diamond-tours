import { Alert, Modal } from '@mui/material'
import React, { useRef, useState } from 'react'
import { TourDataProps } from '../types/Types'
// import { CiImageOn } from "react-icons/ci";
// import { FaPlus } from "react-icons/fa6";
import { FeedbackProps } from '../assets/types/Types';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
// import axios from 'axios'
// import { API } from '../constants/Constants'

type NewProps = {
    currentData:TourDataProps | null;
    setCurrentData: React.Dispatch<React.SetStateAction<TourDataProps | null>>;
    setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
    isNew: boolean;
}


const NewTour = ({currentData, setCurrentData, isNew, setIsNew}:NewProps) => {
    const [depDate, setDepDate] = useState<string>('');
    const [retDate, setRetDate] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [rating, setRating] = useState<number>(1);
    const [price, setPrice] = useState<number>(0);
    const [tripPlan, setTripPlan] = useState<string>('');
    const [photos, setPhotos] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<FeedbackProps>({error:false, message:''});
    const formRef = useRef<HTMLFormElement>(null);
  
    const handleClose = ()=>{
        setCurrentData(null);
        setIsNew(false);
    }

    const addTour = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setFeedback({error:false, message:''});
        if (
          name.trim() !== "" &&
          location.trim() !== "" &&
          price !== 0 &&
          photos.trim() !== "" &&
          depDate.trim() !== "" &&
          retDate.trim() !== ""
        ) {
          try {
            setLoading(true);
            const data = {
              name,
              location,
              rating,
              price,
              photos,
              tripPlan,
              from: depDate,
              to: retDate,
              favourites: [],
              createdAt:serverTimestamp()
            };
            console.log(data)
            await addDoc(collection(db, "Tours"), data);
            formRef.current?.reset();
            setFeedback({ error: false, message: "Tour Added Successfully" });
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

    const updateTour = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setFeedback({error:false, message:''});
        
        try {
          setLoading(true);
          const data = {
            name:name||currentData?.name,
            location: location||currentData?.location,
            rating:rating ||currentData?.rating,
            price:price ||currentData?.price,
            photos:photos ||currentData?.photos,
            tripPlan:tripPlan ||currentData?.tripPlan,
            from: depDate ||currentData?.from,
            to: retDate||currentData?.to,
            favourites: currentData?.favourites,
            createdAt:serverTimestamp()
          };
          currentData && await updateDoc(doc(db, "Tours", currentData?.id), data);
          formRef.current?.reset();
          setFeedback({ error: false, message: "Tour updated Successfully" });
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
      open={currentData !== null || isNew}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        onClick={() => {}}
        className="flex cursor-pointer w-full h-screen items-center justify-center"
      >
        <div className="flex w-[90%] xl:w-5/6 p-4 rounded-xl h-full overflow-y-scroll overflow-x-hidden  z-10 cursor-default bg-white flex-col gap-4 items-center">
          <span className="text-2xl font-semibold self-start">
            Add new site
          </span>
          <form
            ref={formRef}
            onSubmit={currentData ? updateTour : addTour}
            className="flex flex-col gap-4 bg-[#F8F8F8] w-full rounded-2xl px-4 grow"
          >
            <div className="flex flex-col  w-full py-8 lg:flex-row lg:items-start lg:justify-between gap-4 items-center">
              {/* <div className="flex flex-col gap-3 w-full lg:flex-1 items-center">
                <div className="flex cursor-pointer items-center justify-center h-60 w-60 rounded-xl bg-[#D9D9D9]">
                    <CiImageOn size={60} color='grey' />
                </div>
                <span className='text-[0.8rem]' >Add more photos</span>
                <div className="grid grid-cols-3 items-center gap-4">
                    <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg bg-[#D9D9D9]">
                        <FaPlus size={18} color='grey' />
                    </div>
                    <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg bg-[#D9D9D9]">
                        <FaPlus size={18} color='grey' />
                    </div>
                    <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg bg-[#D9D9D9]">
                        <FaPlus size={18} color='grey' />
                    </div>
                    <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg bg-[#D9D9D9]">
                        <FaPlus size={18} color='grey' />
                    </div>
                    <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg bg-[#D9D9D9]">
                        <FaPlus size={18} color='grey' />
                    </div>
                    <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg bg-[#D9D9D9]">
                        <FaPlus size={18} color='grey' />
                    </div>
                </div>
            </div> */}

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
                </div>
              </div>

              <div className="flex w-full lg:flex-1 flex-col gap-4 lg:gap-8 mt-4 lg:mt-0 items-center md:items-start">
                <span className="font-semibold text-xl lg:text-2xl">
                  Tour Information
                </span>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">Site name</span>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      defaultValue={currentData?.name}
                      className="w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2"
                      type="text"
                      placeholder="type here"
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">Location</span>
                    <input
                      onChange={(e) => setLocation(e.target.value)}
                      defaultValue={currentData?.location}
                      className="w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2"
                      type="text"
                      placeholder="type here"
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">Price</span>
                    <input
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
                      defaultValue={currentData?.price}
                      className="w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2"
                      type="number"
                      step='any'
                      min={0}
                      placeholder="$"
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">Rating</span>
                    <input
                      onChange={(e) => setRating(parseFloat(e.target.value))}
                      className="w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2"
                      defaultValue={currentData?.rating}
                      type="number"
                      step={0.1}
                      max={5}
                      min={1}
                      placeholder="rate"
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">
                      Trip description
                    </span>
                    <textarea
                      onChange={(e) => setTripPlan(e.target.value)}
                      defaultValue={currentData?.tripPlan}
                      className="w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2"
                      rows={5}
                      placeholder="type here"
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full lg:flex-1 flex-col gap-8">
                <div className="flex flex-row gap-4 w-full">
                  <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[#7c7878]">
                      Departure Date
                    </span>
                    <input
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDepDate(e.target.value)}
                      defaultValue={currentData ? new Date(currentData?.from).toLocaleDateString():new Date().toLocaleDateString()}
                      className="w-32 bg-transparent  rounded-md border border-[grey] outline-none py-1"
                      type="date"
                      placeholder="date"
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">
                      Return Date
                    </span>
                    <input
                      min={
                        depDate && new Date(depDate).toISOString().split("T")[0]
                      }
                      onChange={(e) => setRetDate(e.target.value)}
                      defaultValue={currentData ? new Date(currentData?.to).toLocaleDateString():new Date().toLocaleDateString()}
                      className="w-32 bg-transparent  rounded-md border border-[grey] outline-none py-1"
                      type="date"
                      placeholder="date"
                    />
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
              <button
                onClick={handleClose}
                type="button"
                className="border-2 border-[#cb4900] px-4 py-2 rounded-lg text-[#cb4900]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "bg-slate-300" : "bg-[#cb4900]"
                } px-4 py-2 rounded-lg text-white`}
              >
                {currentData? 'Update site':'Add site'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default NewTour