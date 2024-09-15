import { Alert, Modal } from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { BlogPostProps } from "../types/Types";
import { FeedbackProps } from "../assets/types/Types";
import axios from "axios";
import { API } from "../common/contants";

type NewProps = {
    currentData:BlogPostProps | null;
    setCurrentData: Dispatch<SetStateAction<BlogPostProps | null>>;
    setIsNew: Dispatch<SetStateAction<boolean>>;
    isNew: boolean;
}
const NewBlog = ({currentData, setCurrentData, isNew, setIsNew}:NewProps) => {

    const [featured, setFeatured] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');
    const [excerpt, setExcerpt] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [feedback, setFeedback] = useState<FeedbackProps>({error:false, message:''});
    const formRef = useRef<HTMLFormElement>(null);


    const handleClose = ()=>{
        setCurrentData(null);
        setIsNew(false);
    }


    const addBlog = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            setLoading(true);
            if(title.trim() !=='' && photo.trim() !=='' && excerpt.trim() !=='' && content.trim() !==''){
                const data = {
                    title, content, excerpt, featured,
                    image:photo
                }
                const res = await axios.post(`${API}blogs/create`, data);
                console.log(res)
                if(res.status === 200){
                    setFeedback({error:false, message:'Blog added successfully'});
                    formRef.current?.reset();
                }
            }else{
                setFeedback({error:true, message:'Pease complete the form'});
            }
        } catch (error) {
            console.log(error);
            setFeedback({error:true, message:'Error occured. Please retry'});
        }finally{
            setLoading(false);
        }
    }

    const updateBlog = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const data = {
                title:currentData?.title || title, 
                content:currentData?.content || content, 
                excerpt:currentData?.excerpt || excerpt, 
                featured,
                image:currentData?.image || photo
            }
            const res = await axios.put(`${API}blogs/${currentData?._id}`, data);
            console.log(res);
            if(res.status === 200){
                setFeedback({error:false, message:'Blog updated successfully'});
                const response:BlogPostProps = res.data
                setCurrentData(response);
            }
            
        } catch (error) {
            console.log(error);
            setFeedback({error:true, message:'Error occured. Please retry'});
        }finally{
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
        className="flex cursor-pointer w-full h-screen pb-20 lg:pb-10 pt-10 items-center justify-center"
      >
        <div className="flex w-[90%] xl:w-5/6 p-4 rounded-xl h-full overflow-y-scroll overflow-x-hidden  z-10 cursor-default bg-white flex-col gap-4 items-center">
          <span className="text-2xl font-semibold self-start">
            {currentData ? 'Update blog':'Add new blog'}
          </span>
          <form
            ref={formRef}
            onSubmit={currentData ? updateBlog:addBlog}
            className="flex flex-col gap-4 bg-[#F8F8F8] w-full rounded-2xl px-4 grow"
          >
            <div className="flex flex-col  w-full py-8 lg:flex-row lg:items-start lg:justify-between gap-4 items-center">
              

              <div className="flex w-full lg:flex-1 flex-col gap-4 lg:gap-8 mt-4 lg:mt-0 items-center md:items-start">
                <span className="font-semibold text-xl lg:text-2xl">
                  Insert blog data
                </span>
                <div className="flex flex-col gap-4 w-full">

                   <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">Blog title</span>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      defaultValue={currentData?.title}
                      className="w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2"
                      type="text"
                      placeholder="type here"
                      required
                    />
                  </div>
                   <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">Blog image</span>
                    <input
                      onChange={(e) => setPhoto(e.target.value)}
                      defaultValue={currentData?.image}
                      className="w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2"
                      type="text"
                      placeholder="insert the URL of the blog image here"
                      required
                    />
                  </div>

                  <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">
                      Place Content
                    </span>
                    <textarea
                      defaultValue={currentData?.content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2"
                      rows={10}
                      placeholder="the full content of the blog"
                      required
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="text-[0.rem] text-[grey]">
                      Add exceprt
                    </span>
                    <textarea
                      defaultValue={currentData?.excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="w-full lg:w-[90%] bg-transparent px-3 rounded-md border border-[grey] outline-none py-2"
                      rows={10}
                      required
                      placeholder="normally, the excerpt is the first paragraph of the content"
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

              {/* <div className="flex w-full lg:flex-1 flex-col gap-4 lg:gap-8 mt-4 lg:mt-0 items-center md:items-start">
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
                      // defaultValue={currentData ? new Date(currentData?.from).toLocaleDateString():new Date().toLocaleDateString()}
                      defaultValue={currentData?.from}
                      className="w-32 bg-transparent  rounded-md border border-[grey] outline-none py-1"
                      type="date"
                      placeholder={currentData?.from}
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
                      // defaultValue={currentData ? new Date(currentData?.to).toLocaleDateString():new Date().toLocaleDateString()}
                      className="w-32 bg-transparent  rounded-md border border-[grey] outline-none py-1"
                      type="date"
                      defaultValue={currentData?.to}
                      placeholder={currentData?.to}
                    />
                  </div>
                </div>
              </div> */}
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
                {currentData? 'Update blog':'Add blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default NewBlog