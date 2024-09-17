import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import { BlogPostProps } from '../types/Types';
import { TiEdit } from "react-icons/ti";
import { IoTrashBin } from "react-icons/io5";
import { SearchBlog } from '../functions/search';
import { TouristSites } from '../utils/ContentData';
import { useFetchBlogs } from '../hooks/useFetchBlogs';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
// import { SearchQuery } from '../functions/Search';

type TableProps = {
    setCurrentData:React.Dispatch<React.SetStateAction<BlogPostProps | null>>,
    search:string,
}
export const BlogsTable = ({setCurrentData, search}:TableProps) => {
    // const {searchItem} = useContext(SearchContext);
    // const [rows, setRows] = useState<BlogPostProps[]>([]);

    // // useEffect(()=>{
    // //     const fetchUsers = async()=>{
    // //         const users = await axios.get(API+'users');
    // //         setRows(users.data.sort((a:UserProps, b:UserProps)=>a.createdAt < b.createdAt ? 1:-1));
    // //     }
    // //     fetchUsers()
    // // },[rows])

    const {blogs} = useFetchBlogs();

//    console.log(tours);
    // const deleteItem = async(id:string)=>{
    //     try {
    //         await axios.delete(`${API}blogs/${id}`);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const deleteItem = async(id:string)=>{
        try {
            await deleteDoc(doc(db, 'Blogs', id))
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
                        <img src={params.row?.image?.trim()} alt='pic' className="w-10 h-10 object-cover rounded" />
                    </div>
                )
            }
        },
       
        {
            field:'title',
            headerName: 'Title',
            width: 200,
            renderCell: (params:GridRenderCellParams)=>{
                return(
                    <div className="cellWithImg">
                        <span onClick={()=>setCurrentData(params.row)} className="hover:underline cursor-pointer">{params.row?.title}</span>
                    </div>
                )
            }
        },
        {
            field:'createAt',
            headerName: 'Posted On',
            width: 200,
            renderCell: (params:GridRenderCellParams)=>{
                return(
                    <div className="cellWithImg">
                        <span  className="">{params.row?.createdAt?.toDate()?.toLocaleDateString()}</span>
                    </div>
                )
            }
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
                    getRowId={(row:BlogPostProps)=>row.id}
                    rows={SearchBlog(blogs, search)}
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