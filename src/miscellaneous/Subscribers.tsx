import { Modal } from "@mui/material"
import { CiSearch } from "react-icons/ci"
import { EmailsProps } from "../assets/types/Types"
import { useState } from "react"
import axios from "axios"
import { API } from "../common/contants"

type ModalProps = {
    openModal:boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    emails:EmailsProps[],
}

const Subscribers = ({openModal, setOpenModal, emails}:ModalProps) => {
    const [search, setSearch] = useState<string>('')
    const deleteEmail = async(id:string)=>{
        try {
            await axios.delete(`${API}news/${id}`);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Modal
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <div  className="flex w-full h-screen items-center justify-center">
                <div className='flex self-center w-80 p-4 flex-col relative bg-white h-2/3 rounded-xl' >
                    <button onClick={()=>setOpenModal(false)} type='button' className='h-8 w-8 z-10 bg-red-500 absolute right-2 top-2 rounded-full items-center justify-center text-white' >&times;</button>
                    <div className='flex mt-8 flex-row w-full items-center justify-center bg-slate-100 relative px-4 rounded-xl mb-4' >
                        <CiSearch size={24} className='text-slate-500 absolute left-2' />
                        <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="search" className='w-full outline-none border-none py-2 px-4 bg-transparent placeholder:italic' />
                    </div>
                    <div className="flex flex-col w-full overflow-x-hidden overflow-y-scroll grow">
                        {
                            emails.length > 0?
                            emails.filter((sess:EmailsProps)=>{
                                return search === ''? sess : Object.values(sess)
                                .join(' ')
                                .toLowerCase() 
                                .includes(search.toLowerCase())}).map((email:EmailsProps)=>(
                            <div key={email?._id} className="flex flex-row w-full items-center justify-between py-2 border-t border-b border-slate-400">
                                <span className="text-[0.7rem] max-w-[85%]">{email?.email}</span>
                                <button onClick={()=>deleteEmail(email?._id)} type='button' className='bg-[#cb4900] py-1 px-1 text-[0.6rem] mr-4 text-white rounded-full' >Remove</button>
                            </div>
                            ))
                            :
                            <h2>No subscriber yet</h2>
                        }
                        
                    </div>
                </div>
            </div>
    </Modal>
  )
}

export default Subscribers