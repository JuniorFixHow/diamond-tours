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

export interface ICard{
    id:string;
    name:string;
    image?:string;
    status?:string[];
    price?:string;
    requirements?:string[];
    prices?:{
        duration:string;
        cost: string;
    }[]
}

export interface ISB{
    id:string;
    country:string;
    image:string;
    desc?:string;
}

export interface IStudy{
    id:string;
    title:string;
    assFee:string;
    gradReq:[
        {
            title:string;
            requirements:string[]
        }
    ];
    addFee:string;
    addReq:string[];
    note:string;
    note2:string;
    image?:string;
}

export interface IJob{
    id:string;
    title:string;
    images:string[];
    fee?:string;
    cost:string;
    cost2?:string;
    detail?:string[];
    duration:string;
    salary?:string;
    jobs?:string[];
    requirements?:string[];
    desc?:string;
}

export interface IVisit{
    id:string;
    country:string;
    subs?:string[];
    requirements?:string[];
    price:string;
    duration:string;
}

export interface IPackage{
    id:string;
    title:string;
    image:string;
    desc:string;
    link:string;
}