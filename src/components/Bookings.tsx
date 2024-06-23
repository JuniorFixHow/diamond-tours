import { IoTrashBinOutline } from "react-icons/io5";
import { BookingsData } from "../data/LocalData";
import { BookingsProps } from "../types/Types";

const Bookings = () => {
  return (
    <section className="w-full bg-white py-8 flex flex-col items-center justify-center gap-6" id='bookings' >
      <h2 className="text-black text-center text-2xl sm:text-3xl font-bold" ><span className="text-[#CB4900]" >Appointments</span> Scheduled</h2>
      <div className="flex flex-col w-5/6 lg:grid lg:grid-cols-2 lg:place-items-center justify-center items-center gap-6">
        {
          BookingsData.map((item:BookingsProps)=>(
            <div key={item?.id} className="bg-white hover:bg-slate-300 shadow-2xl rounded-xl p-4 flex flex-col gap-4 lg:gap-2 w-full ">
              <span className="text-[1rem] md:text-xl font-semibold text-[#cb4900]" >{item?.service}</span>
              <span className="text-[1rem] md:text-xl font-medium" >{item?.package}</span>
              <div className="flex flex-row w-full justify-between items-center">
                <span className="text-[1rem] md:text-xl font-medium italic" >{item?.date}</span>
                <IoTrashBinOutline color="crimson" className="cursor-pointer" size={20} />
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Bookings