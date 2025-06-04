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
    <div className="flex flex-col w-full" >
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578473026963707"
     crossOrigin='anonymous' ></script>
          <div className="flex items-center justify-center md:justify-start md:items-end py-8 w-full bg-no-repeat bg-cover h-60 md:h-96 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.7)),url(/packages/flight-4516478_1920.jpg)]">
            <span className="ml-0 text-2xl font-bold text-center text-white md:ml-8" >Visit Visas</span>
          </div>
    
          <div className="flex flex-col items-center w-full gap-8 py-8 bg-white">
            <div className="flex flex-col gap-8 w-[95%]  lg:w-4/5 xl:w-2/3">
                <span className="text-[0.8rem] text-center" >{heading}</span>
                <VisitTable/>
                <div className="grid items-center w-full grid-cols-1 gap-6 md:hidden place-items-center md:grid-cols-2 lg:grid-cols-4">
                {
                    VisitData &&
                    VisitData.map((visit)=>(
                        <div key={visit?.id}  className="flex flex-col gap-1 p-4 shadow cursor-default hover:shadow-lg">
                            <span className='text-2xl font-semibold lg:text-4xl' >{visit?.country}</span>
                            <div className="flex items-center gap-4">
                                <span className="text-[#CB4900] font-bold" >Price:</span>
                                <span className="text-[0.9rem] font-bold" >{visit?.price}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[#CB4900] font-bold" >Processing Time</span>
                                <span className="text-[0.9rem] font-bold" >{visit?.duration}</span>
                            </div>
                        </div>
                    ))
                }
                </div>

                <div className="flex flex-col gap-5">
                <span className='text-2xl font-semibold text-center md:text-left lg:text-4xl' >Gallery</span>

                <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row md:justify-center">
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