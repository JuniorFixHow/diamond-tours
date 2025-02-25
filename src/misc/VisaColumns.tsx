import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

export const VisaColumns:GridColDef[] = [
    {
        field:'country',
        headerName:'Country',
        width:120
    },
    {
        field:'subs',
        headerName:'Regions',
        renderCell:({row}:GridRenderCellParams)=>{
            const subs = row?.subs;
            return(
                subs?.map((item:string)=>(
                    <span key={item} >{item}, </span>
                ))
            )
        },
        width:200
    },
    {
        field:'requirements',
        headerName:'Requirements',
        renderCell:({row}:GridRenderCellParams)=>{
            const reqs = row?.requirements;
            return(
                reqs?.map((item:string)=>(
                    <span key={item} >{item}, </span>
                ))
            )
        },
        width:200
    },
    {
        field:'price',
        headerName:'Price',
        width:130
    },
    {
        field:'duration',
        headerName:'Processing Time',
        width:150
    },
]