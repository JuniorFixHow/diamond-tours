import { SideJobData } from "../data/JobData"

const OtherOffers = () => {
  return (
    <div className="flex flex-col w-full gap-6 pb-4 border-b" >
        <span className='text-2xl font-semibold text-center md:text-left lg:text-4xl' >Other Offers</span>
        <div className="flex flex-col gap-4">
            {
                SideJobData.map((item)=>(
                    <div key={item.id}  className="flex items-center gap-4">
                        <span className="text-[0.9rem]" >&#8226; {`${item?.title.toUpperCase()} ${item?.description ? `(${item?.description.toUpperCase()})` : ''} - ${item?.price}`}</span>       
                    </div>
                ))
            }

        </div>
    </div>
  )
}

export default OtherOffers
