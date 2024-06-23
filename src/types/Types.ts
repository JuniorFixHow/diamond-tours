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
    id:number,
    service:string,
    package:string,
    date:string,
}|null