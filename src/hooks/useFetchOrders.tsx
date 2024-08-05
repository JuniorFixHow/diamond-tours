import { useEffect, useState } from "react";
import { collection,  onSnapshot, orderBy, query, } from "firebase/firestore";
import { db } from '../firebase';
import { OrderProps } from "../types/Types";

export const useFetchOrders =()=>{
    const [orders, setOrders] = useState<OrderProps[]>([]);

    useEffect(() => {
        const reference = collection(db, 'Orders');
        const q = query(reference, orderBy('createdAt', 'asc'));
        const unsub = onSnapshot(
          q,
          { includeMetadataChanges: true },
          (snapshot) => {
            const list: OrderProps[] = [];
            snapshot.docs.forEach((doc) => {
              const tourData = doc.data() as OrderProps;
              list.push({ ...tourData, id: doc.id });
            //   console.log(doc.data());
            });
            if (list.length) {
              setOrders(list.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
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
    // }, [orders]);

    return {  orders };
};