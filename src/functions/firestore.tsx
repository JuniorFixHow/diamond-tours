import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const cancelOrder = async(userId:string, id:string, message:string):Promise<boolean>=>{
    try {
        await updateDoc(doc(db, 'Orders', id), {status:'Cancelled'});
        await addDoc(collection(db, 'Notifications'), {
            title:'Booking cancelled',
            content: message,
            userId,
            timestamp:serverTimestamp(),
            read:false
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const approveOrder = async(userId:string, id:string, name:string):Promise<boolean>=>{
    try {
        await updateDoc(doc(db, 'Orders', id), {status:'Approved'});
        await addDoc(collection(db, 'Notifications'), {
            title:`Booking approved`,
            content: `Your booking for ${name} has been approved`,
            userId,
            timestamp:serverTimestamp(),
            read:false
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const restoreOrder = async(userId:string, id:string, name:string):Promise<boolean>=>{
    try {
        await updateDoc(doc(db, 'Orders', id), {status:'Pending'});
        await addDoc(collection(db, 'Notifications'), {
            title:`Booking restored`,
            content: `Your booking for ${name} has been restored`,
            userId,
            timestamp:serverTimestamp(),
            read:false
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const deleteOrder = async(id:string):Promise<boolean>=>{
    try {
        await deleteDoc(doc(db, 'Orders', id));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
