import { CardData } from "../data/CardData";
import { PackageData } from "../data/PackageData";

const Cards = () => {
    const heading = PackageData[3]?.desc;
    
  return (
    <div className="flex flex-col w-full" >
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578473026963707"
     crossOrigin='anonymous' ></script>
        <div className="flex items-center justify-center md:justify-start md:items-end py-8 w-full bg-no-repeat bg-cover h-60 md:h-96 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.7)),url(/packages/passport-2642170_1920.jpg)]">
            <span className="ml-0 text-2xl font-bold text-center text-white md:ml-8" >Certificates & Cards</span>
        </div>
        
        <div className="flex flex-col items-center w-full gap-8 py-8 bg-white">
            <div className="flex flex-col gap-8 w-[95%]  lg:w-4/5 xl:w-2/3">
                <span className="text-[0.8rem] text-center" >{heading}</span>
                <div className="flex flex-col items-start w-full gap-10">
                {
                    CardData &&
                    CardData.map((card)=>{
                        const prices = card?.prices;
                        const reqs = card?.requirements;
                        const stats = card?.status;
                        return(
                            <div key={card?.id}  className="flex flex-col gap-1 p-4 ml-10 md:m-0">
                                <span className='text-2xl font-semibold md:text-left lg:text-4xl' >{card?.name}</span>

                                <div className="flex flex-col gap-8 md:gap-[5rem] items-start md:flex-row">
                                    {
                                        card?.price &&
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#CB4900] font-bold" >Price:</span>
                                            <span className="text-[0.9rem] font-bold" >{card?.price}</span>
                                        </div>
                                    }
                                    {
                                        prices &&
                                        <div className="flex flex-col w-full gap-2">
                                            <span className="text-[#CB4900] font-bold" >Prices</span>
                                            {
                                                prices?.map((item)=>(
                                                    <div key={item?.duration} className="flex justify-between gap-4 md:justify-start">
                                                        <span className="text-[#CB4900] font-bold text-[0.9rem]" >&#8226;  {item?.duration}</span>
                                                        <div className="flex flex-col items-end gap-3 md:flex-row">
                                                            <span  className="text-[0.9rem] font-bold" >{item?.cost}</span>
                                                            {
                                                                item?.note &&
                                                                <span className="text-[0.7rem] font-bold text-center" >({item?.note})</span>
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                    {
                                        reqs &&
                                        <div className="flex flex-col gap-2">
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
                                        <div className="flex flex-col gap-2">
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