import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { BlogPostProps } from '../types/Types';
import { FaArrowRightLong } from "react-icons/fa6";
import { useFetchBlogs } from '../hooks/useFetchBlogs';

const SingleBlog = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [currentBlog, setCurrentBlog] = useState<BlogPostProps | null >(null);
    const {blogs} = useFetchBlogs();
    useEffect(()=>{
      if(id){
        setCurrentBlog(blogs.filter((item:BlogPostProps)=>item._id === id)[0])
      }
    },[id, blogs])

    useEffect(()=>{
      if(currentBlog){
        document.title = currentBlog.title
      }
      return ()=>{
        document.title = 'Diamond Tours Ghana'
      }
    },[currentBlog])
    
    if(!currentBlog) return null
  return (
    <div className='w-full flex flex-col items-center py-8 gap-10' >
      <div className="flex flex-col gap-6 w-[80%] lg:items-center">
        <div className="flex flex-col w-[90%] gap-4">
          <span className='text-2xl lg:text-4xl font-semibold' >{currentBlog?.title}</span>
          <span className='font-light' >{new Date(currentBlog!.createdAt)?.toLocaleDateString()}</span>
        </div>

        <img src={currentBlog?.image} className='w-full object-cover h-40 md:h-[80vh]' alt={currentBlog?.title} />

        <div className="flex w-full lg:w-[80%] self-center">
          <span className='leading-10' >{currentBlog?.content}</span>
        </div>
      </div>

      <div onClick={()=>navigate('/blogs/list')} className='border text-orange-900 hover:text-white hover:bg-blue-900 hover:border-none duration-300 hover:px-4 cursor-pointer border-[#cb4900] py-4 px-2 w-fit self-center flex flex-row items-center gap-4' >
        <span  >View all news</span>
        <FaArrowRightLong  />
      </div>
    </div>
  )
}

export default SingleBlog