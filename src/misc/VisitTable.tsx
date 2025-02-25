import { Box } from "@mui/material"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { VisaColumns } from "./VisaColumns";
import { VisitData } from "../data/VisitData";


const VisitTable = () => {
  return (
    <div className="bg-white shadow-lg p-4 hidden md:flex flex-col w-full items-center gap-5 rounded" >
        <span className='text-2xl lg:text-4xl font-semibold' >Visa Summary</span>
        <Box sx={{ height: 'auto', width: '100%' }}>
            <DataGrid
                rows={VisitData}
                columns={VisaColumns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 10,
                    },
                },
                }}
                slots={{toolbar:GridToolbar}}
                slotProps={{
                    toolbar:{
                        showQuickFilter:true
                    }
                }}
                pageSizeOptions={[5, 10, 15]}
                // checkboxSelection
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableRowSelectionOnClick
            />
        </Box>
    </div>
  )
}

export default VisitTable