import { useEffect, useState } from "react";
import { ChatProps, ChatProps2 } from "../assets/types/Types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from '../firebase';

export const useFetch =()=>{
    const [chats, setChats] = useState<ChatProps[]>([]);

    const fetchData = async () => {
        const reference = collection(db, 'Chats');
        const q = query(reference, orderBy("time", "desc"));
        const data = await getDocs(q);
        
        try {
            const list: ChatProps[] = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data() as ChatProps2
            }));

            // Create a Map to store the most recent chat for each user
            const mostRecentChats = new Map<string, ChatProps>();

            // Iterate through the list and update the Map
            list.forEach(chat => {
                if (!mostRecentChats.has(chat.userId) || chat.time > mostRecentChats.get(chat.userId)!.time) {
                    mostRecentChats.set(chat.userId, chat);
                }
            });

            // Convert the Map back to an array
            setChats(Array.from(mostRecentChats.values()));
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
    useEffect(() => {  
        fetchData();
    }, [chats]);

    return { fetchData, chats };
};