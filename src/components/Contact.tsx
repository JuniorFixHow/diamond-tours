import { useRef, useState } from "react";
import { FeedBackPops } from "../types/Types";
import { Alert } from "@mui/material";
import axios from "axios";
import { API } from "../data/Constats";

const Contact = () => {

  const [feedback, setFeedback] = useState<FeedBackPops>({error:false, message:''});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const formRef = useRef<HTMLFormElement|null>(null);
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      setIsLoading(true);
      setFeedback({error:false, message:''});
      if(name.trim()!=='' && email.trim()!=='' && subject.trim()!=='' && message.trim()!==''){
        const data = {name, email, subject, message, read:false};
        try {
          const res = await axios.post(`${API}contacts/create`, data);
          if(res.status===200){
            setFeedback({error:false, message:"Message sent. We'll reply shortly."})
            formRef.current?.reset();
          }
        } catch (error) {
          console.log(error);
          setFeedback({error:true, message:'Error occured. Please try again'})
        }finally{
          setIsLoading(false);
        }

      }else{
        setFeedback({error:true, message:'Please complete the form'});
        setIsLoading(false);
    }
    }

    const loadStyle = "bg-slate-400 border-none px-4 py-2 cursor-default text-white font-bold  rounded-xl"
    const normalStyle = "bg-[#CB4900] border-none px-4 py-2 cursor-pointer text-white font-bold hover:bg-orange-500 rounded-xl"
  return (
    <section id='contact' className="w-full scroll-mt-14 bg-[#d9d9d9] flex flex-col items-center justify-center py-8" >
     <div className="flex flex-col items-center justify-center w-5/6 gap-8" >
      <h2 className="w-full text-2xl font-bold text-center text-black sm:text-3xl md:text-left" ><span className="text-[#CB4900]" >Contact Us</span></h2>
        <div className="flex flex-col items-center w-full lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col w-full gap-2 md:flex-1">
            <span className="text-xl font-semibold text-[#CB4900]">Mobile App</span>
            <h2 className="text-xl sm:w-2/3">Book Packages and <span className="font-bold" >Services </span> 
            easily on our app</h2>
            <div className="flex flex-col items-center justify-center gap-4 p-4 bg-white shadow-2xl rounded-3xl">
              <img src="/imgs/dd55d56b4b210f412e498033b83ad5e9.png" className="w-68 h-80" alt="" />
              {/* <div className="flex flex-row items-center justify-between w-72 ">
                <div className="flex flex-row items-center justify-center w-32 h-10 gap-2 px-2 bg-white shadow-inner cursor-pointer hover:bg-slate-400 rounded-xl">
                  <img src="/imgs/d19103e11bc7426d37bea8eddbc632c6.png" className="object-cover w-4 h-4" alt="" />
                  <span className="text-black text-[0.7rem] font-bold leading-3">Download on the App Store</span>
                </div>
                <div className="flex flex-row items-center justify-center w-32 h-10 gap-2 px-2 bg-black shadow-inner cursor-pointer hover:bg-slate-800 rounded-xl">
                  <img src="/imgs/aef7f2e3b85f3938d9b7293b615d97c1.png" className="object-cover w-4 h-4" alt="" />
                  <span className="text-white text-[0.7rem] font-bold leading-3">GET IT ON Google Play</span>
                </div>
              </div> */}
            </div>
            <span className="text-xl font-semibold text-[#CB4900] mt-4">Contact Details</span>
            <div className="flex flex-col">
              <h2 className="text-[0.9rem]"><span className="font-bold" >Location: Ejisu, Nasona Filling Station, Last floor</span></h2>
              <h2 className="text-[0.9rem]"><span className="font-bold" >Phone: +233-534-775141 </span></h2>
              <h2 className="text-[0.9rem]"><span className="font-bold" >Email: info@diamondtoursghana.com </span></h2>
            </div>
          </div>

          <div className="flex items-center justify-center w-full md:flex-1 md:justify-end">
            <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-3xl self-center  shadow-2xl gap-4 flex flex-col mt-8 lg:mt-0 items-center justify-center px-2 py-4 md:p-8 lg:py-20 w-80 lg:[25rem] md:w-5/6 xl:w-[30rem]">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-black text-[0.9rem] font-bold">Get In Touch</span>
                <span className="text-[0.75rem] text-[#CB4900]" >Contact us <span className="text-black" >for help and enquiries</span> </span>
              </div>
              <input onChange={(e)=>setName(e.target.value)} required type="text" placeholder="Name" className="w-5/6 border border-[#CB4900] outline-none rounded-full p-2" />
              <input onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="Email Address" className="w-5/6 border border-[#CB4900] outline-none rounded-full p-2" />
              <input onChange={(e)=>setSubject(e.target.value)} required type="text" placeholder="Subject" className="w-5/6 border border-[#CB4900] outline-none rounded-full p-2" />
              <textarea onChange={(e)=>setMessage(e.target.value)} required name="" rows={5} placeholder="message..." className="w-5/6 border border-[#CB4900] outline-none rounded-2xl p-2" id=""></textarea>
              {
                feedback.message &&
                <Alert onClose={()=>setFeedback({error:false, message:''})} severity={feedback.error? 'error':'success'} >{feedback.message}</Alert>
              }
              <button type='submit' disabled={isLoading} className={isLoading?loadStyle:normalStyle}>{isLoading?'Loading...':'Send Message'}</button>
            </form>
          </div>
        </div>
     </div>
    </section>
  )
}

export default Contact