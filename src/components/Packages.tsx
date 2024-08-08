import React, { useRef, useState } from "react";
import { PackagesData, ServiceData } from "../data/LocalData"
import { FeedBackPops, PackagesProps, ServicesProps } from "../types/Types"
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from "axios";
import Alert from '@mui/material/Alert';
import { API } from "../data/Constats";
import { useAuth } from "../hooks/useAuth";
// import { useAuth } from "@clerk/clerk-react"


const Packages = () => {
    const [phone, setPhone] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [service, setService] = useState<string>('Visa Application and Advisory');
    const [packages, setPackages] = useState<string>('Canada');
    const [date, setDate] = useState<string>('');
    const [fname, setFname] = useState<string>('');
    const [lname, setLname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<FeedBackPops>({error:false, message:''});

    const formRef = useRef<HTMLFormElement | null>(null);
    const {user} = useAuth();
    const handleSubmit =async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setFeedback({error:false, message:''});
        setIsLoading(true);
        if (
          city.trim() !== "" &&
          date.trim() !== "" &&
          phone.trim() !== "" &&
          region.trim() !== "" &&
          country.trim() !== "" &&
          lname.trim() !== "" &&
          fname.trim() !== "" &&
          email.trim() !== ""
        ) {
           try {
                const data = {
                  email,
                  fullname: { last: lname, first: fname },
                  phone,
                  service,
                  packages,
                  date,
                  userId:user?.id,
                  location: { country, region, city },
                  status:'Pending'
                };
                const res = await axios.post(`${API}bookings/create`, data);
                if(res.status === 200){
                    setFeedback({error:false, message:'Appointment booked successfully. Check the Bookings section to see your appointments'});
                    formRef.current?.reset();
                }
           } catch (error) {
            setFeedback({error:true, message:'Error occured. Please retry'})
           }finally{
            setIsLoading(false);
           }
        }else{
            setFeedback({error:true, message:'Please complete the form'});
            setIsLoading(false);
        }
    }
  
    const loadStyle = "bg-slate-400 rounded-xl px-4 py-2 text-white font-semibold cursor-default ";
    const normalStyle = "bg-[#cb4900] rounded-xl px-4 py-2 text-white font-semibold cursor-pointer hover:bg-orange-400";
  return (
    <section id='packages' className="py-8 scroll-mt-14 bg-[#D9D9D9] w-full flex items-center justify-center " >
        <div className="w-5/6 flex flex-col gap-8 sm:px-4">
            <h2 className="text-black text-2xl sm:text-3xl font-bold text-center md:text-left" >Explore Our <span className="text-[#CB4900]" >Packages</span></h2>
            <div className="flex w-full flex-col xl:flex-row items-start xl:justify-between">
                <div className="xl:flex xl:flex-1">
                    <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            PackagesData.map((item:PackagesProps)=>(
                                <div className="flex w-full flex-col gap-2">
                                    <span className="text-xl font-semibold text-center md:text-left text-[#CB4900]">{item?.title}</span>
                                    <span className="text-[1rem] font-medium text-center md:text-left text-black">{item?.text}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="xl:flex xl:flex-1 w-full mt-8 lg:mt-0 items-center justify-center xl:justify-end">
                    <div className="flex w-full lg:w-5/6 flex-col gap-4 items-center">
                        <h2 className="text-black text-2xl sm:text-3xl text-center font-bold mt-4 xl:mt-0" ><span className="text-[#CB4900]" >Book</span> An Appointment</h2>
                        <form ref={formRef} onSubmit={handleSubmit}  className="bg-white shadow-lg rounded-2xl p-4 w-full gap-4 flex flex-col md:w-2/3 lg:w-full">
                        {
                            user?
                        <>
                            <div className="flex-col gap-0 lg:gap-4 flex lg:flex-row w-full items-center justify-between">
                                <input required onChange={(e)=>setFname(e.target.value)} type="text" className="w-full xl:w-1/2 text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none" placeholder="First Name" />
                                <input required onChange={(e)=>setLname(e.target.value)} type="text" className="w-full mt-4 lg:mt-0 xl:w-1/2 text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none" placeholder="Last Name" />
                            </div>
                            <input required onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none" placeholder="Enter Email" />
                            <PhoneInput
                                country={"us"}
                                value={phone}
                                onChange={(e) => setPhone(e)}
                                // inputClass='inp'
                                inputStyle={{ width: "100%", border:"1px solid #CB4900", borderRadius:'0.7rem', fontSize:'1.25rem', }}
                                containerStyle={{ width: "100%", }}
                                // inputStyle={{paddingLeft:'3rem'}}
                            />
                            <CountryDropdown
                                classes="w-full text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none"
                                value={country}
                                onChange={(e) => setCountry(e)}
                            />
                            <RegionDropdown
                                country={country}
                                classes="w-full text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none"
                                value={region}
                                onChange={(e) => setRegion(e)}
                            />
                            <input required onChange={(e)=>setCity(e.target.value)} type="text" className="w-full text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none" placeholder="Enter your city" />
                            <div className="flex-col gap-0 lg:gap-4 flex lg:flex-row w-full items-center justify-between">
                            <select
                                onChange={(e) => setService(e.target.value)}
                                defaultValue="Visa Application and Advisory"
                                className="w-full xl:w-1/2 text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none"
                                name="service"
                                id=""
                                title="service"
                            >
                                {
                                    ServiceData.map((service:ServicesProps)=>(
                                        <option key={service?.id} value={service?.title}>{service?.title}</option>
                                    ))
                                }
                            </select>
                            <select
                                onChange={(e) => setPackages(e.target.value)}
                                defaultValue="Canada"
                                className="w-full xl:w-1/2 text-xl sm:tex-[1rem] mt-4 md:mt-0 py-2 px-4 rounded-xl border border-[#CB4900] outline-none"
                                name="service"
                                id=""
                                title="service"
                            >
                                {
                                    PackagesData.map((item:PackagesProps)=>(
                                        <option key={item?.id} value={item?.title}>{item?.title}</option>
                                    ))
                                }
                            </select>
                               
                            </div>
                            <input required onChange={(e)=>setDate(e.target.value)} min={new Date().toISOString().slice(0, 16)} type='datetime-local' placeholder='Set appointment date' className='w-full text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none' />
                            {
                                feedback.message &&
                                <Alert onClose={()=>setFeedback({error:false, message:''})} severity={feedback.error? 'error':'success'} >{feedback.message}</Alert>
                            }
                            <button disabled={isLoading} type='submit' className={isLoading?loadStyle:normalStyle} >{isLoading? 'Loading...': 'Submit'}</button>
                        </>
                        :
                        <span className="font-bold text-xl md:text-2xl text-center" >Login to Book an Appointment</span>
                        }
                            <span className="font-bold text-2xl text-center">OR</span>
                            <a className="text-center " target="blank" href="https://calendly.com/diamondtoursghana">
                                <span className="font-bold text-xl text-[#cb4900] cursor-pointer hover:underline text-center" >Schedule online meeting</span>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Packages