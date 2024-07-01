import { Timestamp } from "firebase/firestore"
import React from "react"

export type FeedbackProps = {
    message:string,
    error:boolean
}

export type PageProp ={
    setCurrentPage:React.Dispatch<React.SetStateAction<string>>
}

export type BookingsProps = {
    _id:string,
    email:string,
    fullname: { last: string, first: string },
    phone:string,
    service:string,
    packages: string,
    date:string,
    userId: string,
    location: { country:string, region:string, city:string },
    status:'Pending'|'Approved'|'Cancelled'
}

export type ChatProps = {
    id:string,
    message:string,
    time:Timestamp,
    read:boolean,
    userId:string,
    sent:boolean,
    lastMessage?:string,
    user?:{
        email:string,
        name:string,
        image:string,
        hasImage:boolean
    }
}
export type ChatProps2 = {
    message:string,
    time:Timestamp,
    read:boolean,
    userId:string,
    sent:boolean,
    lastMessage?:string,
    user?:{
        email:string,
        name:string,
        image:string,
        hasImage:boolean
    }
}

export type AppProps={
    showConfirm?:boolean,
    isCancel?:boolean,
    cancelMode?:boolean,
    setCancelMode: React.Dispatch<React.SetStateAction<boolean>>,
    _id:string,
    email:string,
    fullname: { last: string, first: string },
    phone:string,
    service:string,
    packages: string,
    date:string,
    userId: string,
    location: { country:string, region:string, city:string },
    status:'Pending'|'Approved'|'Cancelled',
    // onDelete:()=>void,
    onConfirm?:()=>void,
    // onProceed:()=>void,
    // onOpen:()=>void,
    handleCancelApp:()=>void,
    currentId:string,
    setCurrentId:React.Dispatch<React.SetStateAction<string>>
}

export type ContactProps = {
    email:string,
    name:string,
    subject:string,
    message:string,
    read:boolean,
    createdAt:string,
    _id:string,
}
export type MessageProps = {
    email:string,
    emails:string[],
    subject:string,
    message:string,
    createdAt:string,
    _id:string,
}
export type EmailsProps={
    email:string,
    _id:string
}