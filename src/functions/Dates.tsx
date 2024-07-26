import { Timestamp } from "firebase/firestore"

export const formatDateAndTime = (date:string)=>{
    return new Date(date).toLocaleString(navigator.language, {
        dateStyle: 'short',
        timeStyle: 'short',
    })
}


export const formatFirebaeDateAndTime = (date:Timestamp)=>{
  // console.log(new Date(currentData?.departureTimestamps.toString()).toLocaleDateString())
    return new Date(date.toString()).toLocaleString(navigator.language, {
        dateStyle: 'short',
        timeStyle: 'short'
    })
}


  export const calcMinDate = ()=>{
    const currentDateTime = new Date();
    const date = currentDateTime.toISOString().slice(0, 16);
    return date;
  }