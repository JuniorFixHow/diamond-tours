import {  Pagination, Autoplay, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// import 'swiper/css/scrollbar';
import { BlogPostProps } from '../types/Types';
import { useNavigate } from 'react-router-dom';
import { useFetchBlogs } from '../hooks/useFetchBlogs';

const Swipper = () => {
  const navigate = useNavigate();

  const {fBlogs} = useFetchBlogs();

  return (
    <section id='hero' className="z-10">

    <Swiper
      modules={[ Pagination, Scrollbar, A11y, Autoplay]}
    //   spaceBetween={50}
      slidesPerView={1}
      direction='horizontal'
      // navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className="w-full relative h-[83vh] md:h-[100vh]"
      grabCursor={true}
    >
      {
        fBlogs &&
        fBlogs.map((blog: BlogPostProps) => (
          <SwiperSlide onClick={()=>navigate(`blogs/${blog.id}`)} key={blog.id} className='w-full h-full flex items-center justify-center'>
            <div className="flex relative w-full h-full items-center justify-center">
                <img src={blog?.image} className='w-full h-full object-cover absolute filter brightness-50' alt={blog.title} />
                <div className="flex flex-col gap-8 w-full items-center z-10">
                  <span className='text-[1.5rem] lg:text-[2rem] font-bold text-white w-[90%] md:w-3/4 text-center' >{blog?.title}</span>
                  <span className='hidden md:block text-white w-[75%] text-center' >{blog?.excerpt}</span>
                  <span className='md:hidden text-white w-[90%]' >{blog?.content?.slice(0, 50)}...</span>
                </div>
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
    </section>
  )
}

export default Swipper