import { PackageData } from "../data/PackageData"
import { VisitData } from "../data/VisitData";
import VisitTable from "../misc/VisitTable";

const Visit = () => {
    const heading = PackageData[2]?.desc;
    const images = [
        '/packages/visit_main.jpg',
        '/packages/visit3.jpg',
        '/packages/visa_schengen.jpg',
        '/packages/visa1.jpg',
        '/packages/visa2.jpg',
    ]
  return (
    <div className="w-full flex flex-col" >
          <div className="flex items-center justify-center md:justify-start md:items-end py-8 w-full bg-no-repeat bg-cover h-60 md:h-96 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.7)),url(/packages/flight-4516478_1920.jpg)]">
            <span className="text-2xl text-white font-bold text-center ml-0 md:ml-8" >Visit Visas</span>
          </div>
    
          <div className="flex flex-col gap-8 items-center py-8 bg-white w-full">
            <div className="flex flex-col gap-8 w-[95%]  lg:w-4/5 xl:w-2/3">
                <span className="text-[0.8rem] text-center" >{heading}</span>
                <VisitTable/>
                <div className="grid md:hidden place-items-center gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center w-full">
                {
                    VisitData &&
                    VisitData.map((visit)=>(
                        <div key={visit?.id}  className="flex flex-col gap-1 p-4 hover:shadow-lg shadow cursor-default">
                            <span className='text-2xl lg:text-4xl font-semibold' >{visit?.country}</span>
                            <div className="flex gap-4 items-center">
                                <span className="text-[#CB4900] font-bold" >Price:</span>
                                <span className="text-[0.9rem] font-bold" >{visit?.price}</span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <span className="text-[#CB4900] font-bold" >Processing Time</span>
                                <span className="text-[0.9rem] font-bold" >{visit?.duration}</span>
                            </div>
                        </div>
                    ))
                }
                </div>

                <div className="flex flex-col gap-5">
                <span className='text-2xl text-center md:text-left lg:text-4xl font-semibold' >Gallery</span>

                <div className="flex flex-col gap-4 sm:flex-row flex-wrap items-center md:justify-center">
                    {
                        images?.map((src, index)=>(
                            <img src={src} alt={index.toString()} key={index} className="w-[10rem] hover:w-[95%] sm:hover:w-[20rem]" />
                        ))
                    }
                </div>
                </div>
            </div>            
          </div>
        </div>
  )
}

export default Visit