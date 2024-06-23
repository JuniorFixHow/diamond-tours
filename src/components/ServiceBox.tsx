import Modal from '@mui/material/Modal';
import { ServicesProps } from '../types/Types';

type service = {
    openModal:boolean,
    handleCloseService: ()=>void,
    currentService:ServicesProps
}
const ServiceBox = ({openModal, handleCloseService, currentService}:service) => {
  return (
    <Modal
        open={openModal}
        onClose={handleCloseService}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div onClick={handleCloseService} className="grid w-full h-screen place-items-center">
            <div className="w-5/6 py-4 px-2 bg-white flex flex-col gap-4 items-center rounded-xl justify-center md:w-1/3 relative">
                <button onClick={handleCloseService} className='absolute right-0 top-0 cursor-pointer text-2xl text-red-400' >&times;</button>
                <span className="text-[#CB4900] text-2xl text-center font-bold">{currentService?.title}</span>
                <img src={currentService?.image} className='w-full h-60' alt="" />
                <span className='text-justify text-slate-800 text-[1rem] w-5/6 font-semibold' >{currentService?.text}</span>
            </div>
        </div>
      </Modal>
  )
}

export default ServiceBox