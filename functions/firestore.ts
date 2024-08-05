import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const makeFavourite = async(id: string, col:string, uid:string)=>{
   try {
        await updateDoc(doc(db, col, id),{
            favourites:arrayUnion(uid)
        })
   } catch (error) {
    console.log(error);
   }

}


export const removeFavourite = async(id: string, col:string, uid:string)=>{
   try {
        await updateDoc(doc(db, col, id),{
            favourites:arrayRemove(uid)
        })
   } catch (error) {
    console.log(error);
   }

}