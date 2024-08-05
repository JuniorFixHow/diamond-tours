import { FlightDataProps, HotelDataProps, TourDataProps } from "../types/Types";

export const SearchTour = (data:TourDataProps[], query:string, country:string, price:number, rate:number | string)=>{
    return(
        data.filter((item)=>{
            return query === '' ? item : Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(query.toLowerCase())
        }).filter((item)=>{
            return country === 'All' ? item : item.location
            .toLowerCase()
            .includes(country.toLowerCase())
        }).filter((item)=>{
            return price === 0 ? item : item.price <= price
        }).filter((item)=>{
            return rate === 'All' ? item : item.rating <= rate
        })
    )
}


export const SearchHotel = (data:HotelDataProps[], query:string, country:string, price:number, rate:number | string)=>{
    return(
        data.filter((item)=>{
            return query === '' ? item : Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(query.toLowerCase())
        }).filter((item)=>{
            return country === 'All' ? item : item.location
            .toLowerCase()
            .includes(country.toLowerCase())
        }).filter((item)=>{
            return price === 0 ? item : item.adultPrice <= price
        }).filter((item)=>{
            return rate === 'All' ? item : item.rating <= rate
        })
    )
}


export const SearchFlights = (
  data: FlightDataProps[],
  query: string,
  air: string,
  price: number,
  departure: string,
  arrival: string,
  depDate: Date,
  arrDate: Date
) => {
  return data
    .filter((item) => {
      return query === ""
        ? item
        : Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase());
    })
    .filter((item) => {
      return air === "All"
        ? item
        : item.name.toLowerCase().includes(air.toLowerCase());
    })
    .filter((item) => {
      return departure === "All"
        ? item
        : item.departure.toLowerCase().includes(departure.toLowerCase());
    })
    .filter((item) => {
      return arrival === "All"
        ? item
        : item.arrival.toLowerCase().includes(arrival.toLowerCase());
    })
    .filter((item) => {
      return price === 0 ? item : item.price <= price;
    })
    .filter((item) => {
      return depDate.toLocaleDateString() === new Date().toLocaleDateString()
        ? item
        : new Date(item.departureTimestamps).toLocaleDateString() ===
            depDate.toLocaleDateString();
    })
    .filter((item) => {
      return arrDate.toLocaleDateString() === new Date().toLocaleDateString()
        ? item
        : new Date(item.arrivalTimestamps).toLocaleDateString() ===
            arrDate.toLocaleDateString();
    });
};