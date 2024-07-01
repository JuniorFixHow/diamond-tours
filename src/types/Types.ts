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