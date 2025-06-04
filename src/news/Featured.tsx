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
    <div className="flex justify-center w-full py-8 bg-white" >
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578473026963707"
     crossOrigin='anonymous' ></script>
      <div className="lg:w-[90%] xl:w-[80%] flex gap-12 lg:gap-0 flex-col lg:flex-row items-center lg:items-start lg:justify-between">
        
        <div className="flex lg:w-[70%] xl:w-[60%] flex-col gap-4 px-8 lg:px-0">
          <span className="text-2xl font-bold">{currentBlog?.title || fBlogs[0]?.title}</span>
          <span className="font-medium text-slate-500" >{(currentBlog && currentBlog!.createdAt?.toDate()?.toLocaleDateString()) || fBlogs[0]?.createdAt?.toDate()?.toLocaleDateString()}</span>
          <img className="w-full h-52 md:h-80 lg:h-[30rem]" src={currentBlog?.image || fBlogs[0]?.image} alt={currentBlog?.title || fBlogs[0]?.title} />
          <span className="leading-6" >{currentBlog?.excerpt || fBlogs[0]?.excerpt} <span onClick={()=>navigate(`/blogs/${currentBlog?.id}`)} className="text-blue-700 underline cursor-pointer w-fit hover:text-blue-900" >Continue reading</span> </span>
          
        </div>
        <BlogsSlideBar search={search} setSearch={setSearch} setCurrentBlog={setCurrentBlog} data={SearchBlog(fBlogs, search)} />
      </div>
    </div>
  )
}

export default FeaturedBlogs