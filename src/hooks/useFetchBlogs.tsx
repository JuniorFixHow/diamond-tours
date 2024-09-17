import { useEffect, useState } from "react";
import { BlogPostProps } from "../types/Types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";


export const useFetchBlogs =()=>{
    const [blogs, setBlogs] = useState<BlogPostProps[]>([]);

    useEffect(() => {
      const reference = collection(db, 'Blogs');
      const q = query(reference, orderBy('createdAt', 'asc'));
      const unsub = onSnapshot(
        q,
        { includeMetadataChanges: true },
        (snapshot) => {
          const list: BlogPostProps[] = [];
          snapshot.docs.forEach((doc) => {
            const tourData = doc.data() as BlogPostProps;
            list.push({ ...tourData, id: doc.id });
          //   console.log(doc.data());
          });
          if (list.length) {
            setBlogs(list.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
          //   console.log(list)
          }
        },
        (error) => {
          console.log(error);
        }
      );
    
      return () => {
        unsub();
      };
    }, []);

    // fetchData();
    // useEffect(() => {  
    //     fetchData();
    // }, [tours]);

    return {  blogs };
};