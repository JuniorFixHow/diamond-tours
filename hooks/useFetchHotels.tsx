import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, orderBy, query, } from "firebase/firestore";
import { db } from '../firebase';
import { HotelDataProps } from "../types/Types";

export const useFetchHotels =()=>{
    const [hotels, setHotels] = useState<HotelDataProps[]>([]);
    const [hotelLoading, setHotelLoading] = useState<boolean>(false);

    useEffect(() => {
        setHotelLoading(true);
        const reference = collection(db, 'Hotels');
        const q = query(reference, orderBy('createdAt', 'asc'));
        const unsub = onSnapshot(
          q,
          { includeMetadataChanges: true },
          (snapshot) => {
            let list: HotelDataProps[] = [];
            snapshot.docs.forEach((doc) => {
              const tourData = doc.data() as HotelDataProps;
              list.push({ ...tourData, id: doc.id });
            });
            setHotelLoading(false);
            if (list.length) {
              setHotels(list.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
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
    // }, [hotels]);

    return {  hotels, hotelLoading };
};