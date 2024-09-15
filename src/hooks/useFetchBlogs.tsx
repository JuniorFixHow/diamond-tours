import { useEffect, useState } from "react";
import { BlogPostProps } from "../types/Types";
import axios from "axios";
import { API } from "../data/Constats";

export const useFetchBlogs =()=>{
    const [blogs, setBlogs] = useState<BlogPostProps[]>([]);
    const [fBlogs, setFBlogs] = useState<BlogPostProps[]>([]);

    useEffect(() => {
        
        const fetchData = async()=>{
          const res = await axios.get(`${API}blogs`);
          const data:BlogPostProps[] = res.data
          setBlogs(data.sort((a,b)=>new Date(a.createdAt) < new Date(b.createdAt) ? 1:-1));
          setFBlogs(data.sort((a,b)=>new Date(a.createdAt) < new Date(b.createdAt) ? 1:-1)
          .filter((item)=>item.featured)
        );
        }

        fetchData();
      }, [blogs]);

    // fetchData();
    // useEffect(() => {  
    //     fetchData();
    // }, [tours]);

    return {  blogs, fBlogs };
};