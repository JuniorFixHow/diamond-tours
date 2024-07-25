import  { useState } from "react";
import Header from "../miscellaneous/Header"
import { IoIosArrowRoundBack } from "react-icons/io";
import { PageProp } from "../assets/types/Types";

import { FlightDataProps } from "../types/Types";
import { FlightTable } from "../tables/FlightsTable";
import NewFlight from "../miscellaneous/NewFlight";


const Flights = ({setCurrentPage}:PageProp) => {

    const [search, setSearch] = useState<string>('');
    const [currentData, setCurrentData] = useState<FlightDataProps | null> (null);
    const [isNew, setIsNew] = useState<boolean> (false);


  return (
    <section className=" flex flex-col items-center gap-8">
      <Header newsButton={false} />
      {/* {
        feedback.message &&
        <Alert onClose={()=>setFeedback({error:false, message:''})} severity={feedback.error?'error':'success'} >{feedback.message}</Alert>
      } */}
      <NewFlight currentData={currentData} setCurrentData={setCurrentData} isNew={isNew} setIsNew={setIsNew} />
      <div className="flex gap-4 flex-col items-center w-[90%]">
        <div className="flex flex-row w-full items-center justify-between">

            <div className="flex flex-row items-center  gap-1 md:gap-4 self-start">
                <IoIosArrowRoundBack
                    onClick={() => setCurrentPage("home")}
                    size={30}
                    className="cursor-pointer"
                />
                <h2 className="font-semibold text-xl md:text-2xl">Flights</h2>
            </div>
          <div onClick={()=>setIsNew(true)} className="flex items-center justify-center px-4 py-1 cursor-pointer bg-[#cb4900] text-white rounded-lg self-end">New</div>
        </div>
        <input className="w-[87%] lg:w-[92%] border border-slate-200 outline-none px-4 py-2 rounded-lg" type="text" placeholder="search" onChange={(e)=>setSearch(e.target.value)} />
        <FlightTable search={search} setCurrentData={setCurrentData} />
      </div>
    </section>
  );
}

export default Flights