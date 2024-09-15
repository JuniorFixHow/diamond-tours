import {  useState } from "react"
import { BlogPostProps } from "../types/Types"
import BlogsSlideBar from "./BlogsSlideBar"
import { useNavigate } from "react-router-dom"
import { SearchBlog } from "../functions/search"
import { useFetchBlogs } from "../hooks/useFetchBlogs"

const FeaturedBlogs = () => {
  const {fBlogs} = useFetchBlogs();
  const navigate = useNavigate();
  const [currentBlog, setCurrentBlog]=useState<BlogPostProps | null>(null);
  const [search, setSearch] = useState<string>('');
  // const [filteredBlogs, setFilteredBlogs] = useState<BlogPostProps[]>([]);


  // console.log(search)
  // useEffect(()=>{
  //   if(fBlogs.length > 0){

  //     setCurrentBlog(fBlogs[0])
  //   }
  // },[fBlogs])

  // useEffect(() => {
  //     setFilteredBlogs(SearchBlog(BlogPosts, search));
  // }, [search]);
  if(fBlogs.length < 1) return null
  return (
    <div className="w-full flex justify-center bg-white py-8" >
      <div className="lg:w-[90%] xl:w-[80%] flex gap-12 lg:gap-0 flex-col lg:flex-row items-center lg:items-start lg:justify-between">
        
        <div className="flex lg:w-[70%] xl:w-[60%] flex-col gap-4 px-8 lg:px-0">
          <span className="text-2xl font-bold">{currentBlog?.title || fBlogs[0]?.title}</span>
          <span className="text-slate-500 font-medium" >{(currentBlog && new Date(currentBlog!.createdAt)?.toLocaleDateString()) || new Date(fBlogs[0]?.createdAt)?.toLocaleDateString()}</span>
          <img className="w-full h-52 md:h-80 lg:h-[30rem]" src={currentBlog?.image || fBlogs[0]?.image} alt={currentBlog?.title || fBlogs[0]?.title} />
          <span className="leading-6" >{currentBlog?.excerpt || fBlogs[0]?.excerpt} <span onClick={()=>navigate(`/blogs/${currentBlog?._id}`)} className="w-fit underline text-blue-700 hover:text-blue-900 cursor-pointer" >Continue reading</span> </span>
          
        </div>
        <BlogsSlideBar search={search} setSearch={setSearch} setCurrentBlog={setCurrentBlog} data={SearchBlog(fBlogs, search)} />
      </div>
    </div>
  )
}

export default FeaturedBlogs