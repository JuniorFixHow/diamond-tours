import { Link } from "react-router-dom"
import { PackageData } from "../data/PackageData"

const AvailablePackages = () => {
  return (
    <section id="new-packages"  className="py-8 flex flex-col gap-4 w-full items-center scroll-mt-14 bg-[#D9D9D9]" >
        <h2 className="text-black text-center text-2xl sm:text-3xl font-bold" ><span className="text-[#CB4900]" >Packages</span> Available</h2>
        <div className="flex flex-col gap-8 w-5/6 items-center">
            <span className="text-[0.9rem] text-center font-semibold" >Explore global opportunities through work and study abroad while ensuring you have essential documentation. Navigate visa applications smoothly and secure vital certificates like your Birth Certificate, Ghana Card, Passport, and Marriage Certificate to achieve your goals effortlessly.</span>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    PackageData?.map((item)=>(
                        <Link to={`/${item.link}`}  className="flex flex-col hover:cursor-pointer gap-3 hover:shadow items-center w-[18rem] md:w-[16rem] bg-white" key={item.id} >
                            <img src={item?.image} alt={item?.title} className="w-full h-[8rem] object-cover" />
                            <div className="flex gap-3 pb-3 flex-col items-center px-3">
                                <span className="text-[#CB4900] text-[0.9rem] font-semibold" >{item?.title}</span>
                                <span className="text-[0.8rem] font-medium" >{item.desc.slice(0,100)}... <Link to={`/${item?.link}`}  className="text-blue-500 text-[0.8rem] font-bold cursor-pointer hover:underline" >read more</Link> </span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default AvailablePackages