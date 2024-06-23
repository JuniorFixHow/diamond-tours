import { useState } from "react"
import { ServiceData } from "../data/LocalData"
import { ServicesProps } from "../types/Types"
import ServiceBox from "./ServiceBox";

const Services = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [currentService, setCurrentService] = useState<ServicesProps>(null);
    const handleOpenService = (item:ServicesProps)=>{
        setCurrentService(item);
        setOpenModal(true);
    }
    const handleCloseService = ()=>{
        setCurrentService(null);
        setOpenModal(false);
    }
  return (
    <section id="services" className="w-5/6 flex flex-col py-8 self-center gap-8 items-center justify-center" >
        <h2 className="text-black text-center text-2xl sm:text-3xl font-bold" ><span className="text-[#CB4900]" >Services</span> We Offer</h2>
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {
                ServiceData &&
                ServiceData.map((item:ServicesProps)=>(
                    <div onClick={()=>handleOpenService(item)} key={item?.id} className="rounded-2xl hover:cursor-pointer flex flex-col item-center justify-center w-80 md:w-72 shadow-xl pb-4">
                        <img src={item?.image} className=" rounded-2xl w-full h-48 object-cover" alt="" />
                        <span className="text-black font-medium text-[1rem] mt-4 text-center">{item?.title}</span>
                    </div>
                ))
            }
        </div>
        <ServiceBox currentService={currentService} openModal={openModal} handleCloseService={handleCloseService}  />
    </section>
  )
}

export default Services