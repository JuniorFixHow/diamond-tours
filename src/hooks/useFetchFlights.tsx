import { useEffect, useState } from "react";
import { collection, getDocs, } from "firebase/firestore";
import { db } from '../firebase';
import { FlightDataProps } from "../types/Types";

export const useFetchFlights =()=>{
    const [flights, setFlights] = useState<FlightDataProps[]>([]);

    const fetchData = async () => {
        const reference = collection(db, 'Flights');
        // const q = query(reference, orderBy("createdAt", "desc"));
        const data = await getDocs(reference);
        
        try {
            const list: FlightDataProps[] = data.docs.map((doc) => {
                const hotelData = doc.data() as FlightDataProps;
                return {
                  ...hotelData,
                  id: doc.id,
                };
              });

            // Create a Map to store the most recent chat for each user
            // console.log(list)

            // Convert the Map back to an array
            setFlights(list.sort((a, b)=>a?.createdAt > b?.createdAt ? 1:-1));
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
    useEffect(() => {  
        fetchData();
    }, [flights]);

    return { fetchData, flights };
};