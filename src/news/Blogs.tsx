import { useNavigate } from "react-router-dom"
import { BlogPostProps } from "../types/Types"
import { useFetchBlogs } from "../hooks/useFetchBlogs";

const Blogs = () => {
  const navigate = useNavigate();
  const {blogs} = useFetchBlogs();
  return (
    <div className="flex flex-col w-full" >
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578473026963707"
     crossOrigin='anonymous' ></script>
      <div className="flex items-center justify-center md:justify-start md:items-end py-8 w-full bg-no-repeat bg-cover h-60 md:h-96 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.7)),url(/imgs/vdw3fdnjrjqyxxscep5n.png)]">
        <span className="ml-0 text-2xl font-bold text-center text-white md:ml-8" >Diamond Blog</span>
      </div>

      <div className="flex justify-center w-full py-8 bg-white">
        <div className="flex flex-col w-full xl:w-[80%] gap-8 items-center sm:grid grid-cols-2 md:grid-cols-3 place-items-center">
          {
            blogs &&
            blogs.map((blog:BlogPostProps)=>(
              <div onClick={()=>navigate(`/blogs/${blog.id}`)} className="flex w-[20rem] md:w-[18rem] lg:w-[20rem] flex-col pb-4 gap-4 items-center hover:shadow-xl bg-white cursor-pointer" key={blog.id} >
                <img className="w-full object-cover h-[12rem]" src={blog?.image} alt={blog.title} />
                <div className="flex flex-col gap-4 w-[90%] self-center">

                  <span className="text-[0.9rem] text-[#cb4900] md:text-[1rem] font-light" >{blog?.createdAt?.toDate()?.toLocaleDateString()}</span>
                  <span className="text-black hover:text-violet-950" >{blog.excerpt.slice(0, 100)}...</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Blogs