import { useEffect, useState } from "react";
import { collection,  onSnapshot, orderBy, query, } from "firebase/firestore";
import { db } from '../firebase';
import { FlightDataProps } from "../types/Types";

export const useFetchFlights =()=>{
    const [flights, setFlights] = useState<FlightDataProps[]>([]);

    useEffect(() => {
        const reference = collection(db, 'Flights');
        const q = query(reference, orderBy('createdAt', 'asc'));
        const unsub = onSnapshot(
          q,
          { includeMetadataChanges: true },
          (snapshot) => {
            const list: FlightDataProps[] = [];
            snapshot.docs.forEach((doc) => {
              const tourData = doc.data() as FlightDataProps;
              list.push({ ...tourData, id: doc.id });
            //   console.log(doc.data());
            });
            if (list.length) {
              setFlights(list.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
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

    return {  flights };
};