import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, orderBy, query, where, } from "firebase/firestore";
import { db } from '../firebase';
import { OrderProps } from "../types/Types";
import { useAuth } from "../context/AuthContext";

export const useFetchOrders =()=>{
    const [orders, setOrders] = useState<OrderProps[]>([]);
    const [pendingOrders, setPendingOrders] = useState<OrderProps[]>([]);
    const [approvedOrders, setApprovedOrders] = useState<OrderProps[]>([]);
    const [cancelledOrders, setCancelledOrders] = useState<OrderProps[]>([]);
    const [ordersLoading, setOrdersLoading] = useState<boolean>(false);
    const {user} = useAuth();

  

    useEffect(() => {
      if(user){

        setOrdersLoading(true);
        const reference = collection(db, 'Orders');
        // const q = query(reference, orderBy('createdAt', 'asc'));
        const q = query(reference, where('userId', '==', user?.id))
        const unsub = onSnapshot(
          q,
          { includeMetadataChanges: true },
          (snapshot) => {
            let list: OrderProps[] = [];
            snapshot.docs.forEach((doc) => {
              const orderData = doc.data() as OrderProps;
              list.push({ ...orderData, id: doc.id });
            });
            setOrdersLoading(false);
            if (list.length) {
              setOrders(list.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
              setPendingOrders(list.filter(item=>item.status === 'Pending').sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
              setApprovedOrders(list.filter(item=>item.status === 'Approved').sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
              setCancelledOrders(list.filter(item=>item.status === 'Cancelled').sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
            }
          },
          (error) => {
            console.log(error);
          }
        );
      
        return () => {
          unsub();
        };
      }
      }, []);

    // fetchData();
    // useEffect(() => {  
    //     fetchData();
    // }, [tours]);

    return {  orders, pendingOrders, approvedOrders, cancelledOrders, ordersLoading };
};