import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, orderBy, query, } from "firebase/firestore";
import { db } from '../firebase';
import { FlightDataProps } from "../types/Types";

export const useFetchFlights =()=>{
    const [flights, setFlights] = useState<FlightDataProps[]>([]);
    const [flightLoading, setFlightLoading] = useState<boolean>(false);

    useEffect(() => {
        setFlightLoading(true);
        const reference = collection(db, 'Flights');
        const q = query(reference, orderBy('departureTimestamps', 'asc'));
        const unsub = onSnapshot(
          q,
          { includeMetadataChanges: true },
          (snapshot) => {
            let list: FlightDataProps[] = [];
            snapshot.docs.forEach((doc) => {
              const tourData = doc.data() as FlightDataProps;
              list.push({ ...tourData, id: doc.id });
            });
            setFlightLoading(false);
            if (list.length) {
              setFlights(list.sort((a, b) => (new Date(a.departureTimestamps) > new Date(b.departureTimestamps) ? 1 : -1)));
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
    // }, [flights]);

    return {  flights, flightLoading };
};