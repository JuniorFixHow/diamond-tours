import { Timestamp } from "firebase/firestore"

export type ServicesProps = {
    id:number,
    title:string,
    text:string,
    image:string
}|null
export type PackagesProps = {
    id:number,
    title:string,
    text:string,
}|null
export type BookingsProps = {
    _id:string,
    email:string,
    fullname: { last: string, first: string },
    phone:string,
    service:string,
    package: string,
    date:string,
    userId: string,
    location: { country:string, region:string, city:string },
    status:'Pending'|'Approved'|'Cancelled'
}

export type FeedBackPops = {
    error:boolean,
    message:string
}

export type UserProps={
    displayName:string;
    email:string,
    photoURL:string;
    phone:string;
    id:string;
}

export type ReviewProps={
    _id:string,
    user:{
        name:string,
        id?:string,
        photo:string
    },
    isReply:boolean,
    originalReview:string,
    content:string,
    createdAt?:string
}

export interface BlogPostProps {
    id:string;
    title: string;      
    createdAt: Timestamp; 
    content: string;    
    // tags: string[];     
    image: string;     
    excerpt: string;
    featured:boolean;   
  }