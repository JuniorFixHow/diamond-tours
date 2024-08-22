import { useEffect, useState } from "react";
import { collection,  onSnapshot, orderBy, query, where, } from "firebase/firestore";
import { db } from '../firebase';
import { NotificationProps, OrderProps } from "../types/Types";
import { useAuth } from "../context/AuthContext";

export const useFetchNotifications =()=>{
    const [notis, setNotis] = useState<NotificationProps[]>([]);
    const [unreads, setUnreads] = useState<number>(0);
    const [notisLoading, setNotisLoading] = useState<boolean>(false);

    const {user} = useAuth()

  

    useEffect(() => {
      if(user){

        setNotisLoading(true);
        const reference = collection(db, 'Notifications');
        // const q = query(reference, orderBy('createdAt', 'asc'));
        const q = query(reference, where('userId', '==', user?.id))
        const unsub = onSnapshot(
          q,
          { includeMetadataChanges: true },
          (snapshot) => {
            let list: NotificationProps[] = [];
            snapshot.docs.forEach((doc) => {
              const notisData = doc.data() as NotificationProps;
              list.push({ ...notisData, id: doc.id });
            });
            setNotisLoading(false);
            if (list.length) {
              setNotis(list.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1)));
              setUnreads(list.filter(item => !item?.read)?.length);
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

    return {  notis, unreads, notisLoading };
};