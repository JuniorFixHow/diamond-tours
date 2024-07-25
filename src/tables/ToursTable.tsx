import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import { TourDataProps } from '../types/Types';
import { TiEdit } from "react-icons/ti";
import { IoTrashBin } from "react-icons/io5";
import { SearchTour } from '../functions/search';
import { TouristSites } from '../utils/ContentData';
import { useFetchTours } from '../hooks/useFetchTour';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
// import { SearchQuery } from '../functions/Search';

type TableProps = {
    setCurrentData:React.Dispatch<React.SetStateAction<TourDataProps | null>>,
    search:string,
}
export const ToursTable = ({setCurrentData, search}:TableProps) => {
    // const {searchItem} = useContext(SearchContext);
    // const [rows, setRows] = useState<TourDataProps[]>([]);

    // // useEffect(()=>{
    // //     const fetchUsers = async()=>{
    // //         const users = await axios.get(API+'users');
    // //         setRows(users.data.sort((a:UserProps, b:UserProps)=>a.createdAt < b.createdAt ? 1:-1));
    // //     }
    // //     fetchUsers()
    // // },[rows])

    const {tours} = useFetchTours();

//    console.log(tours);
    const deleteItem = async(id:string)=>{
        try {
            await deleteDoc(doc(db, 'Tours', id));
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
                        <img src={params.row.photos.split(',')[0]} alt='pic' className="w-10 h-10 object-cover rounded" />
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
          field: 'location',
          headerName: 'Loaction',
          width: 150,
        },

        
        {
            field: 'rating',
            headerName: 'Rating',
            width: 150,
        },
        {
          field: 'from',
          headerName: 'Date',
          width: 200,
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
                TouristSites.length ?
                <DataGrid
                    getRowId={(row:TourDataProps)=>row.id}
                    rows={SearchTour(tours, search)}
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