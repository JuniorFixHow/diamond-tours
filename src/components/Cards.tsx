import { CardData } from "../data/CardData";
import { PackageData } from "../data/PackageData";

const Cards = () => {
    const heading = PackageData[3]?.desc;
    
  return (
    <div className="w-full flex flex-col" >
        <div className="flex items-center justify-center md:justify-start md:items-end py-8 w-full bg-no-repeat bg-cover h-60 md:h-96 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.7)),url(/packages/passport-2642170_1920.jpg)]">
            <span className="text-2xl text-white font-bold text-center ml-0 md:ml-8" >Certificates & Cards</span>
        </div>
        
        <div className="flex flex-col gap-8 items-center py-8 bg-white w-full">
            <div className="flex flex-col gap-8 w-[95%]  lg:w-4/5 xl:w-2/3">
                <span className="text-[0.8rem] text-center" >{heading}</span>
                <div className="flex flex-col items-start gap-10 w-full">
                {
                    CardData &&
                    CardData.map((card)=>{
                        const prices = card?.prices;
                        const reqs = card?.requirements;
                        const stats = card?.status;
                        return(
                            <div key={card?.id}  className="flex ml-10 md:m-0 flex-col gap-1 p-4">
                                <span className='text-2xl md:text-left lg:text-4xl font-semibold' >{card?.name}</span>

                                <div className="flex flex-col gap-8 items-center md:gap-[5rem] md:items-start md:flex-row">
                                    {
                                        card?.price &&
                                        <div className="flex gap-2 items-center">
                                            <span className="text-[#CB4900] font-bold" >Price:</span>
                                            <span className="text-[0.9rem] font-bold" >{card?.price}</span>
                                        </div>
                                    }
                                    {
                                        prices &&
                                        <div className="flex gap-2 flex-col w-full">
                                            <span className="text-[#CB4900] font-bold" >Prices</span>
                                            {
                                                prices?.map((item)=>(
                                                    <div key={item?.duration} className="flex gap-4">
                                                        <span className="text-[#CB4900] font-bold text-[0.9rem]" >&#8226;  {item?.duration}</span>
                                                        <span  className="text-[0.9rem] font-bold" >{item?.cost}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                    {
                                        reqs &&
                                        <div className="flex gap-2 flex-col">
                                            <span className="text-[#CB4900] font-bold" >Requirements</span>
                                            {
                                                reqs?.map((item)=>(
                                                    <span key={item}  className="text-[0.9rem] text-nowrap font-bold" >&#8226;  {item}</span>
                                                ))
                                            }
                                        </div>
                                    }
                                    {
                                        stats &&
                                        <div className="flex gap-2 flex-col">
                                            <span className="text-[#CB4900] font-bold" >Status</span>
                                            {
                                                stats?.map((item)=>(
                                                    <span key={item}  className="text-[0.9rem] font-bold" >&#8226;  {item}</span>
                                                ))
                                            }
                                        </div>
                                    }

                                </div>
                                
                            </div>

                        )
                    })
                }
                </div>

                
            </div>            
          </div> 
    </div>
  )
}

export default Cards