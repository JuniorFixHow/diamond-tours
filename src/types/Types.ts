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