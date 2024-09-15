import { BlogPostProps, FlightDataProps, HotelDataProps, OrderProps, TourDataProps } from "../types/Types"

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


export const SearchOrder = (data:OrderProps[], query:string, type:string)=>{
  return(
      data.filter((item)=>{
          return query === '' ? item : Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
      }).filter((item)=>{
          return type === 'All' ? item : item.type
          .toLowerCase()
          .includes(type.toLowerCase())
      })
  )
}


export const SearchBlog = (data:BlogPostProps[], search:string)=>{
  return(
      data.filter((item)=>{
        return search === '' ? item : Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      })
    )
}