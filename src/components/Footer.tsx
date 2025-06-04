import { FaAngleRight, FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { PiTiktokLogo } from "react-icons/pi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Alert } from "@mui/material";
import { useRef, useState } from "react";
import { FeedBackPops } from "../types/Types";
import axios from "axios";
import { API } from "../data/Constats";

const Footer = () => {
    const [feedback, setFeedback] = useState<FeedBackPops>({error:false, message:''});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');


    const formRef = useRef<HTMLFormElement | null>(null);
  const handleNewsLetter = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setIsLoading(true);
    const data = {email}
    try {
        if(email.trim() !==''){
            const res = await axios.post(`${API}news/create`, data);
            if(res.status === 201){ 
                setFeedback({error:false, message:res.data})
            }else if(res.status === 200){
                setFeedback({error:false, message:"You've subscribed for our newsletters"});
            }
            formRef.current?.reset();
            setEmail('');
        }
    } catch (error) {
        console.log(error);
        setFeedback({error:true, message:'Error occured. Please try again'});
    }finally{
        setIsLoading(false);
    }
  }

  const normalStyle = "bg-[#CB4900] hover:bg-orange-500 cursor-pointer h-10 w-8 flex items-center justify-center"
  const disStyle = "bg-slate-400  cursor-default h-10 w-8 flex items-center justify-center"

  return (
    <footer id="footer" className="relative flex flex-col items-center justify-center w-full pt-4 bg-white" >
        
      {
        feedback.message &&
        <Alert onClose={()=>setFeedback({error:false, message:''})} className="fixed self-center w-5/6 top-16 lg:w-1/2" severity={feedback.error? 'error':'success'} variant='standard' >{feedback.message}</Alert>
      }
        <div className="flex flex-col items-center justify-center w-5/6 md:flex-row md:items-start md:justify-around">
            <div className="flex flex-row items-start gap-8">

            <div className="flex flex-col items-start py-4 min-w-32">
                <h2 className="text-2xl text-[#CB4900] font-bold">Links</h2>
                <a href="#hero" className="text-black underline hover:text-blue-500 text-[0.8rem] sm:text-[1rem] font-semibold cursor-pointer" >Home</a>
                <a href="#services" className="text-black underline hover:text-blue-500 text-[0.8rem] sm:text-[1rem] font-semibold cursor-pointer" >Services</a>
                <a href="#packages" className="text-black underline hover:text-blue-500 text-[0.8rem] sm:text-[1rem] font-semibold cursor-pointer" >Packages</a>
                <a href="#bookings" className="text-black underline hover:text-blue-500 text-[0.8rem] sm:text-[1rem] font-semibold cursor-pointer" >Bookings</a>
                <a href="#about" className="text-black underline hover:text-blue-500 text-[0.8rem] sm:text-[1rem] font-semibold cursor-pointer" >About Us</a>
                <a href="#contact" className="text-black underline hover:text-blue-500 text-[0.8rem] sm:text-[1rem] font-semibold cursor-pointer" >Contact Us</a>
                <a href="#reviews" className="text-black underline hover:text-blue-500 text-[0.8rem] sm:text-[1rem] font-semibold cursor-pointer" >Reviews</a>
            </div>
            <div className="flex flex-col items-start py-4 min-w-32">
                <h2 className="text-2xl text-[#CB4900] font-bold">Legals</h2>
                <a className="text-black underline hover:text-blue-500 text-[0.8rem] sm:text-[1rem] font-semibold cursor-pointer" >License</a>
                <a className="text-black underline hover:text-blue-500 text-[0.8rem] sm:text-[1rem] font-semibold cursor-pointer" >Terms and Conditions</a>
                <a className="text-black underline hover:text-blue-500 text-[0.8rem] sm:text-[1rem] font-semibold cursor-pointer" >Refund Policy</a>
            </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-[1rem] text-black md:text-[1.5rem]" >Subscribe to our <span className="text-[#CB4900]" >Newsletter</span></h2>
                <form ref={formRef} onSubmit={handleNewsLetter} className="flex flex-row items-center justify-center">
                    <input onChange={(e)=>setEmail(e.target.value)} required type="text" className="bg-[#d9d9d9] outline-none px-4 py-2 w-72" placeholder="Email" />
                    <button disabled={isLoading} type='submit' className={isLoading? disStyle:normalStyle} ><FaAngleRight />{}</button>
                </form>
                <div className="flex flex-row items-center justify-start gap-6">
                    <a target='blank' href="https://wa.me/+233205035730">
                        <FaWhatsapp className="text-3xl cursor-pointer hover:text-slate-400" />
                    </a>
                    <a target='blank' href="https://www.facebook.com/DiamondTourGhana?mibextid=kFxxJD">
                        <CiFacebook className="text-3xl cursor-pointer hover:text-slate-400" />
                    </a>
                    <a target='blank' href="https://www.instagram.com/diamondtours_gh?igsh=ZnF2eWdkNzh0bGZl">
                        <FaInstagram className="text-3xl cursor-pointer hover:text-slate-400" />
                    </a>
                    <a target='blank' href="https://x.com/diamondtours_gh?s=21&t=quzTkibHjrl5y7ipuSnsYA">
                        <FaXTwitter className="text-3xl cursor-pointer hover:text-slate-400" />
                    </a>
                    <a target='blank' href="https://www.tiktok.com/@diamondtours_gh?_t=8nF1a9vbCfX&_r=1">
                        <PiTiktokLogo className="text-3xl cursor-pointer hover:text-slate-400" />
                    </a>
                </div>
            </div>
        </div>
        <div className="flex items-center mt-4 justify-center bg-[#CB4900] w-full h-10">
            <span className="text-white text-[0.9rem] md:text-[1rem]">&copy; {new Date().getFullYear().toString()} Diamond Tours Ghana. All rights reserved.</span>
        </div>
        <div className="absolute right-8 top-4  flex items-center justify-center cursor-pointer bg-[#CB4900] rounded-full h-8 w-8 hover:bg-orange-500">
            <a href="#hero">
                <MdKeyboardArrowUp className="h-[2rem] w-[2rem] hover:text-white" />
            </a>
        </div>
    </footer>
  )
}

export default Footer