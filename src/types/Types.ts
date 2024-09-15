import { Timestamp } from "firebase/firestore";

export type ToursProps={
    id:string;
    description:string;
    title:string 
    productId:string; 
    mode:string; 
    status:string; 
    timestamp:string; 
    image:string;
    email:string;
    name:string;
    phone:string;
    passportNumber:string,
    price?:string,
}

export type HotelProps={
    id:string;
    description:string;
    title:string 
    productId:string; 
    mode:string; 
    status:string; 
    checkinDate:string; 
    checkoutDate:string; 
    image:string;
    email:string;
    name:string;
    phone:string;
    adults:number,
    children:number,
    price:string,
    timestamp?:string
}

export type FlightProps={
    id:string;
    description:string;
    title:string 
    productId:string; 
    mode:string; 
    type:string; 
    from:string; 
    to:string; 
    cities:string[]; 
    status:string; 
    reurntDepartureDateAndTime:string; 
    returnArrivalDateAndTime:string; 
    departureDateAndTime:string; 
    arrivalDateAndTime:string; 
    image:string;
    email:string;
    name:string;
    passportNumber:string;
    phone:string;
    passengers:number,
    price:string,
    timestamp?:string
}
// export type PhotosProps = {
//     image1
// }
export type TourDataProps = {
    id: string,
    name: string,
    location: string,
    rating: number,
    price: number,
    image: string,
    photos:string,
    createdAt:Timestamp,
    tripPlan:string,
    to:string,
    from:string,
    favourites?:string[],
    featured:boolean
}

export type HotelDataProps = {
    id: string,
    name: string,
    location: string,
    rating: number,
    adultPrice: number,
    childPrice: number,
    photos:string,
    createdAt:Timestamp
    description:string,
    discount:number,
    favourites:string[],
    featured:boolean
}

export type FlightDataProps = {
    id: string,
    name: string,
    tripType: string,
    price: number,
    departure: string,
    departureTimestamps: string,
    arrival: string,
    arrivalTimestamps: string,
    secondArrival: string,
    secondArrivalTimestamps: string,
    thirdArrival: string,
    thirdArrivalTimestamps: string,
    retturn: string,
    retturnTimestamps: string,
    image: string,
    description:string,
    createdAt:string
}


export type OrderProps = {
    id:string,
    userId:string,
    itemId:string,
    email:string,
    fullname?:string,
    passport?:string,
    passportNum?:string,
    phone:string,
    status:string,
    title:string,
    tip:string,
    type:string,
    extras:{
      image:string,
      amount:number,
      adults?:number,
      charges?:number,
      tripType?:string,
      checkin?:string,
      checkout?:string,
      discount?:number,
      adultPrice?:number,
      children?:number,
      childPrice?:number,
      passengers?:number,
    },
    createdAt:Timestamp
}

export type NotificationProps ={
    id:string;
    title:string;
    content:string;
    userId:string;
    timestamp:Timestamp;
    read:boolean;
  }



  export interface BlogPostProps {
    _id:string;
    title: string;      
    createdAt: string | Date; 
    content: string;    
    // tags: string[];     
    image: string;     
    excerpt: string;
    featured:boolean;   
  }