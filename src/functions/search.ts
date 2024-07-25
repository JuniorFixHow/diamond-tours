import { FlightDataProps, HotelDataProps, TourDataProps } from "../types/Types"

export const SearchTour = (data:TourDataProps[], search:string)=>{
    return(
        data.filter((item)=>{
          return search === '' ? item : Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
        })
      )
}

export const SearchHotel = (data:HotelDataProps[], search:string)=>{
    return(
        data.filter((item)=>{
          return search === '' ? item : Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
        })
      )
}


export const SearchFlight = (data:FlightDataProps[], search:string)=>{
    return(
        data.filter((item)=>{
          return search === '' ? item : Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
        })
      )
}