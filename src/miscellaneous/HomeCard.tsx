import { ReactNode } from "react"

type CardProps ={
  title:string,
  subtitle:string,
  icon:ReactNode
  link:string,
  setCurrentPage:React.Dispatch<React.SetStateAction<string>>
}

const HomeCard = ({title, subtitle, icon, link, setCurrentPage}:CardProps) => {
  return (
    <div onClick={()=>setCurrentPage(link)} className='w-full md:w-48 gap-4 px-4 md:px-0 cursor-pointer py-2 md:py-4 border border-[#cb4900] flex flex-row items-center justify-start md:justify-center bg-white hover:shadow-2xl rounded-xl md:rounded-2xl' >
        <div className="flex items-center justify-center p-2 rounded bg-red-200">
            {icon}
        </div>
        <div className="flex flex-col gap-1 items-start justify-center">
            <h3 className="text-[1rem] font-semibold">{title}</h3>
            <small className="text-slate-500 text-xs">{subtitle}</small>
        </div>
    </div>
  )
}

export default HomeCard