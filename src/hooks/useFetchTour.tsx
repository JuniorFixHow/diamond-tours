import { useEffect, useState } from "react";
import { collection, getDocs, } from "firebase/firestore";
import { db } from '../firebase';
import { TourDataProps } from "../types/Types";

export const useFetchTours =()=>{
    const [tours, setTours] = useState<TourDataProps[]>([]);

    const fetchData = async () => {
        const reference = collection(db, 'Tours');
        // const q = query(reference, orderBy("createdAt", "desc"));
        const data = await getDocs(reference);
        
        try {
            const list: TourDataProps[] = data.docs.map((doc) => {
                const tourData = doc.data() as TourDataProps;
                return {
                  ...tourData,
                  id: doc.id,
                };
              });

            // Create a Map to store the most recent chat for each user
            // console.log(list)

            // Convert the Map back to an array
            setTours(list.sort((a, b)=>a?.createdAt > b?.createdAt ? 1:-1));
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
    useEffect(() => {  
        fetchData();
    }, [tours]);

    return { fetchData, tours };
};