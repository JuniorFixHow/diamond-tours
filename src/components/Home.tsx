import HomeCard from "../miscellaneous/HomeCard"
import Header from "../miscellaneous/Header"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineNotification } from "react-icons/ai";
import { PageProp } from "../assets/types/Types";
import { SlBasket } from "react-icons/sl";
import { TbPlaneDeparture } from "react-icons/tb";
import { BsHouseHeart } from "react-icons/bs";
import { PiHouseLine } from "react-icons/pi";




const Home = ({setCurrentPage}:PageProp) => {
    // g-gradient-to-r from-cyan-500 to-blue-500
  return (
    <section className='w-full flex flex-col justify-center items-center h-screen' >
        <div className='w-full items-center flex h-1/2 flex-col gap-8 bg-gradient-to-r from-orange-500 to-white' >
            <Header setCurrentPage={setCurrentPage} newsButton={true} />
            <div className="flex flex-col gap-2">
                <h2 className="font-bold text-center text-xl sm:text-2xl">Hello Admin!</h2>
                <span className="text-sm text-center w-5/6 md:w-full self-center">Let's make it another Amazing day for our Travellers</span>
            </div>
            <div className="flex w-[90%] lg:w-5/6 flex-row gap-4 justify-end md:justify-center items-center md:items-end grow pb-4">
                <HomeCard setCurrentPage={setCurrentPage} link="appointments" title="Schedules" subtitle="View Appointments" icon={<LuCalendarDays className='text-xl text-red-400' />} />
                <HomeCard setCurrentPage={setCurrentPage} link="chats" title="Live Chats" subtitle="Chat with users" icon={<IoChatbubbleEllipsesOutline className='text-xl text-red-400' />} />
                <HomeCard setCurrentPage={setCurrentPage} link="orders" title="Orders" subtitle="View Orders" icon={<SlBasket className='text-xl text-red-400' />} />
                <HomeCard setCurrentPage={setCurrentPage} link="flights" title="Flights" subtitle="View Flights" icon={<TbPlaneDeparture className='text-xl text-red-400' />} />
            </div>
        </div>
        <div className='w-[90%] lg:w-5/6  md:w-full flex mt-3 md:mt-0 flex-row h-1/2 justify-start md:justify-center items-start pt-4 gap-4' >
        <HomeCard setCurrentPage={setCurrentPage} link="tours" title="Tours" subtitle="Manage Tours" icon={<BsHouseHeart className='text-xl text-red-400' />} />
        <HomeCard setCurrentPage={setCurrentPage} link="hotels" title="Hotels" subtitle="Manage Hotels" icon={<PiHouseLine className='text-xl text-red-400' />} />
        <HomeCard setCurrentPage={setCurrentPage} link="messages" title="Messages" subtitle="Send messages" icon={<MdOutlineMailOutline className='text-xl text-red-400' />} />
        <HomeCard setCurrentPage={setCurrentPage} link="news" title="Newsletters" subtitle="Send newsletters" icon ={<AiOutlineNotification className='text-xl text-red-400' />} />
        </div>
    </section>
  )
}

export default Home