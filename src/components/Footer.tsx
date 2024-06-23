import { FaAngleRight, FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { PiTiktokLogo } from "react-icons/pi";
import { MdKeyboardArrowUp } from "react-icons/md";

const Footer = () => {
  return (
    <footer id="footer" className="w-full flex items-center justify-center bg-white pt-4 flex-col relative" >
        <div className="w-5/6 flex flex-col justify-center items-center md:flex-row md:items-start md:justify-around">
            <div className="flex flex-row items-start gap-8">

            <div className="flex flex-col py-4 items-start">
                <h2 className="text-2xl text-[#CB4900] font-bold">Links</h2>
                <a href="#hero" className="text-black underline hover:text-blue-500 text-[1rem] font-semibold cursor-pointer" >Home</a>
                <a href="#services" className="text-black underline hover:text-blue-500 text-[1rem] font-semibold cursor-pointer" >Services</a>
                <a href="#packages" className="text-black underline hover:text-blue-500 text-[1rem] font-semibold cursor-pointer" >Packages</a>
                <a href="#about" className="text-black underline hover:text-blue-500 text-[1rem] font-semibold cursor-pointer" >About Us</a>
                <a href="#contact" className="text-black underline hover:text-blue-500 text-[1rem] font-semibold cursor-pointer" >Contact Us</a>
            </div>
            <div className="flex flex-col py-4 items-start">
                <h2 className="text-2xl text-[#CB4900] font-bold">Legals</h2>
                <a className="text-black underline hover:text-blue-500 text-[1rem] font-semibold cursor-pointer" >License</a>
                <a className="text-black underline hover:text-blue-500 text-[1rem] font-semibold cursor-pointer" >Terms and Conditions</a>
                <a className="text-black underline hover:text-blue-500 text-[1rem] font-semibold cursor-pointer" >Refund Policy</a>
            </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-black text-[1.5rem]" >Subscribe to our <span className="text-[#CB4900]" >Newsletter</span></h2>
                <div className="flex flex-row items-center justify-center">
                    <input type="text" className="bg-[#d9d9d9] outline-none px-4 py-2 w-72" placeholder="Email" />
                    <div className="bg-[#CB4900] hover:bg-orange-500 cursor-pointer h-10 w-8 flex items-center justify-center" ><FaAngleRight /></div>
                </div>
                <div className="flex flex-row gap-6 items-center justify-start">
                    <FaWhatsapp className="hover:text-slate-400 cursor-pointer text-3xl" />
                    <CiFacebook className="hover:text-slate-400 cursor-pointer text-3xl" />
                    <FaInstagram className="hover:text-slate-400 cursor-pointer text-3xl" />
                    <FaXTwitter className="hover:text-slate-400 cursor-pointer text-3xl" />
                    <PiTiktokLogo className="hover:text-slate-400 cursor-pointer text-3xl" />
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