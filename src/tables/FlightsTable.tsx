import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React 
// { useEffect, useState } 
from 'react';
// import axios from 'axios';
import { FlightDataProps } from '../types/Types';
import { TiEdit } from "react-icons/ti";
import { IoTrashBin } from "react-icons/io5";
import { SearchFlight } from '../functions/search';
import { AirLines } from '../utils/ContentData';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useFetchFlights } from '../hooks/useFetchFlights';
// import { SearchQuery } from '../functions/Search';

type TableProps = {
    setCurrentData:React.Dispatch<React.SetStateAction<FlightDataProps | null>>,
    search:string,
}
export const FlightTable = ({setCurrentData, search}:TableProps) => {
    const {flights} = useFetchFlights();
    const deleteItem = async(id:string)=>{
        try {
            await deleteDoc(doc(db, 'Flights', id));
        } catch (error) {
            console.log(error);
        }
    }


   
   
    const columns = [
       
        
        {
            field:'image',
            headerName: '',
            width: 80,
            renderCell: (params:GridRenderCellParams)=>{
                return(
                    <div className=" mt-2">
                        <img src={params.row.image} alt='pic' className="w-10 h-10 object-cover rounded" />
                    </div>
                )
            }
        },
       
        {
            field:'name',
            headerName: 'Name',
            width: 200,
            renderCell: (params:GridRenderCellParams)=>{
                return(
                    <div className="cellWithImg">
                        <span onClick={()=>setCurrentData(params.row)} className="hover:underline cursor-pointer">{params.row?.name}</span>
                    </div>
                )
            }
        },
       
        {
          field: 'departure',
          headerName: 'Departure',
          width: 150,
        },

        
        {
            field: 'tripType',
            headerName: 'Type',
            width: 150,
        },
        {
          field: 'price',
          headerName: 'Price',
          width: 150,
        },
        
        {
            field:'id',
            headerName: 'Actions',
            width: 80,
            renderCell: (params:GridRenderCellParams)=>{
                return(
                    <div className='flex flex-row gap-3 items-center h-full' >
                        <TiEdit onClick={()=>setCurrentData(params.row)} size={20} color='grey' style={{cursor:'pointer'}} />
                        <IoTrashBin onClick={()=>deleteItem(params.row?.id)} size={20} className='cursor-pointer' color='crimson' />
                    </div>
                )
            }
        },
        
      ];

    return(
        <div className='w-[95%] bg-white p-4'>
            {
                AirLines.length ?
                <DataGrid
                    getRowId={(row:FlightDataProps)=>row.id}
                    rows={SearchFlight(flights, search)}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
                :
                <span className='text-2xl font-semibold text-center w-full overflow-hidden' >No Data</span>
            }
    </div>
    )


}