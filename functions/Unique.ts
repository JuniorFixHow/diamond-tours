import { FlightDataProps, HotelDataProps, TourDataProps } from "../types/Types";

export const UniqueTours = (data:TourDataProps[]): string[] => {
    const uniqueLocations = data.reduce((acc: string[], curr: TourDataProps) => {
      const locationParts = curr.location.split(',');
      const countryName = locationParts[locationParts.length - 1].trim();
  
      if (!acc.includes(countryName)) {
        acc.push(countryName);
      }
      return acc;
    }, []);
  
    return ['All', ...uniqueLocations];
  }

  
export const UniqueHotels = (data:HotelDataProps[]): string[] => {
    const uniqueLocations = data.reduce((acc: string[], curr: HotelDataProps) => {
      const locationParts = curr.location.split(',');
      const countryName = locationParts[locationParts.length - 1].trim();
  
      if (!acc.includes(countryName)) {
        acc.push(countryName);
      }
      return acc;
    }, []);
  
    return ['All', ...uniqueLocations];
  }

export const UniqueAirLines = (data:FlightDataProps[]): string[] => {
    const uniqueLocations = data.reduce((acc: string[], curr: FlightDataProps) => {
      const locationParts = curr.name;
      // const countryName = locationParts[locationParts.length - 1].trim();
  
      if (!acc.includes(locationParts)) {
        acc.push(locationParts);
      }
      return acc;
    }, []);
  
    return ['All', ...uniqueLocations];
  }


export const UniqueDepartures = (data:FlightDataProps[]): string[] => {
    const uniqueLocations = data.reduce((acc: string[], curr: FlightDataProps) => {
      const locationParts = curr.departure;
      // const countryName = locationParts[locationParts.length - 1].trim();
  
      if (!acc.includes(locationParts)) {
        acc.push(locationParts);
      }
      return acc;
    }, []);
  
    return ['All', ...uniqueLocations];
  }


export const UniqueArrivals = (data:FlightDataProps[]): string[] => {
    const uniqueLocations = data.reduce((acc: string[], curr: FlightDataProps) => {
      const locationParts = curr.arrival;
      // const countryName = locationParts[locationParts.length - 1].trim();
  
      if (!acc.includes(locationParts)) {
        acc.push(locationParts);
      }
      return acc;
    }, []);
  
    return ['All', ...uniqueLocations];
  }