import { Dispatch, SetStateAction } from "react"
import { BlogPostProps } from "../types/Types"

type SideProps ={
  data:BlogPostProps[],
  setCurrentBlog: Dispatch<SetStateAction<BlogPostProps | null>>,
  setSearch: Dispatch<SetStateAction<string>>,
  search:string,
}

const BlogsSlideBar = ({data, search, setSearch, setCurrentBlog}:SideProps) => {  
  // console.log(search)
  return (
    <div className="w-full lg:w-[28%] flex flex-col gap-4 px-8 lg:px-0" >
      <span className="text-2xl font-bold text-[#cb4900]">Latest News</span>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="search news" className="w-full py-1 px-2 border-none bg-slate-300 outline-none" />
      <div className="flex gap-4 flex-col">

        {
          data.map((blog:BlogPostProps)=>(
            <span key={blog._id} onClick={()=>setCurrentBlog(blog)} className="text-black cursor-pointer hover:text-blue-950 hover:underline "  >{blog?.title}</span>
          ))
        }
      </div>
    </div>
  )
}

export default BlogsSlideBar