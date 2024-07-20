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
    id:number;
    title:string;
    content:string;
    timestamp:string,
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