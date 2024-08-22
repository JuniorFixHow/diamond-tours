import { Timestamp } from "firebase/firestore";

export interface TouristSiteProps {
    id: string;
    name: string;
    location: string;
    rating: number;
    price: number;
    image: string;
    description:string;
    tripPlan:string;
    to:string;
    from:string;
  }

  export type HotelProps = {
    id: string;
    name: string;
    location: string;
    rating: number;
    price: number;
    image: string;
    description: string;
    discount?:number
  };

  export interface AirlineProps {
    name: string;
    id: string;
    image: string;
    departureTime: string;
    arrivalTime: string;
    travelDuration: string;
    from: string;
    to: string;
    price:number;
  }

  export type NotificationProps ={
    id:string;
    title:string;
    content:string;
    userId:string;
    timestamp:Timestamp,
    read:boolean
  }

  export type ChatProps = {
    id:string,
    message:string,
    time:string,
    read:boolean,
    userId:string,
    sent:boolean,
    user?:{
        email:string,
        name:string,
        image:string,
        hasImage:boolean
    }
}


export interface BookingProps {
  id:string;
  type:string;
  title:string;
  productId:string;
  mode:string;//"Tour" | "Hotel" | "Flight";
  image:string;
  status:string; //"Pending" | "Approved" | "Cancelled";
  date:string;
}


export type TourDataProps = {
  id: string,
  name: string,
  location: string,
  rating: string,
  price: number,
  image: string,
  photos:string,
  featured?:boolean,
  createdAt:Timestamp,
  tripPlan:string,
  to:string,
  from:string,
  favourites:string[]
}

export type HotelDataProps = {
  id: string,
  name: string,
  location: string,
  rating: string,
  adultPrice: number,
  childPrice: number,
  photos:string,
  featured?:boolean,
  createdAt:Timestamp
  description:string,
  discount: number,
  charges?: number,
  favourites:string[]
}

export type FlightDataProps = {
  id: string,
  name: string,
  tripType: string,
  price: number,
  departure: string,
  charges?:number,
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
  createdAt:Timestamp
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
  }
    createdAt:Timestamp,
}

export type ChatDataProps = {
  id:string,
  message:string,
  time:Timestamp,
  read:boolean,
  userId:string,
  sent:boolean,
  user?:{
      email:string,
      name:string,
      image:string,
      hasImage:boolean
  }
}

export type UserProps={
  displayName?:string;
  email:string,
  photoURL:string;
  password?:string;
  phone?:string;
  emailVerified?:boolean;
  id:string;
  isSocial?:boolean;
}

export interface GoogleSigninError extends Error {
  code?: string;
}