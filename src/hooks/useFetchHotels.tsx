import { useEffect, useState } from "react";
import { collection, getDocs, } from "firebase/firestore";
import { db } from '../firebase';
import { HotelDataProps } from "../types/Types";

export const useFetchHotels =()=>{
    const [hotels, setHotels] = useState<HotelDataProps[]>([]);

    const fetchData = async () => {
        const reference = collection(db, 'Hotels');
        // const q = query(reference, orderBy("createdAt", "desc"));
        const data = await getDocs(reference);
        
        try {
            const list: HotelDataProps[] = data.docs.map((doc) => {
                const hotelData = doc.data() as HotelDataProps;
                return {
                  ...hotelData,
                  id: doc.id,
                };
              });

            // Create a Map to store the most recent chat for each user
            // console.log(list)

            // Convert the Map back to an array
            setHotels(list.sort((a, b)=>a?.createdAt > b?.createdAt ? 1:-1));
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
    useEffect(() => {  
        fetchData();
    }, [hotels]);

    return { fetchData, hotels };
};