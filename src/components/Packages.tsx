/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useRef, useState } from "react";
import { PackagesData, ServiceData } from "../data/LocalData"
import { PackagesProps, ServicesProps } from "../types/Types"
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Packages = () => {
    const [phone, setPhone] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [sevice, setService] = useState<string>('');
    const [packages, setPackages] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const formRef = useRef<HTMLFormElement | null>(null);

  
  return (
    <section id='packages' className="py-8 bg-[#D9D9D9] w-full flex items-center justify-center " >
        <div className="w-5/6 flex flex-col gap-8 sm:px-4">
            <h2 className="text-black text-2xl sm:text-3xl font-bold text-center md:text-left" >Explore Our <span className="text-[#CB4900]" >Packages</span></h2>
            <div className="flex w-full flex-col xl:flex-row items-start justify-between">
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
                <div className="xl:flex xl:flex-1 w-full mt-8 lg:mt-0 items-center justify-end">
                    <div className="flex w-full lg:w-5/6 flex-col gap-4 items-center ">
                        <h2 className="text-black text-2xl sm:text-3xl text-center font-bold mt-4 xl:mt-0" ><span className="text-[#CB4900]" >Book</span> An Appointment</h2>
                        <form action="" className="bg-white shadow-lg rounded-2xl p-4 w-full gap-4 flex flex-col md:w-2/3 lg:w-full">
                            <div className="flex-col gap-0 lg:gap-4 flex lg:flex-row w-full items-center justify-between">
                                <input type="text" className="w-full xl:w-1/2 text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none" placeholder="First Name" />
                                <input type="text" className="w-full mt-4 lg:mt-0 xl:w-1/2 text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none" placeholder="Last Name" />
                            </div>
                            <input type="email" className="w-full text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none" placeholder="Enter Email" />
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
                            <input onChange={(e)=>setCity(e.target.value)} type="text" className="w-full text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none" placeholder="Enter your city" />
                            <div className="flex-col gap-0 lg:gap-4 flex lg:flex-row w-full items-center justify-between">
                            <select
                                onChange={(e) => setService(e.target.value)}
                                defaultValue=""
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
                                defaultValue=""
                                className="w-full xl:w-1/2 text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none"
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
                            <input onChange={(e)=>setDate(e.target.value)} min={new Date().toISOString().slice(0, 16)} type='datetime-local' placeholder='Set appointment date' className='w-full text-xl sm:tex-[1rem] py-2 px-4 rounded-xl border border-[#CB4900] outline-none' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Packages