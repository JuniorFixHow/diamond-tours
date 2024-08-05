import  {useState } from "react";
// import AppCard from "../miscellaneous/AppCard";
import Header from "../miscellaneous/Header"
import { IoIosArrowRoundBack } from "react-icons/io";
import {   FeedbackProps,  PageProp } from "../assets/types/Types";
import { useFetchOrders } from "../hooks/useFetchOrders";
import { OrderProps } from "../types/Types";
import { SearchOrder } from "../functions/search";
import OrderDetails from "../miscellaneous/OrderDetails";
import { approveOrder, cancelOrder, restoreOrder } from "../functions/firestore";
import { Alert } from "@mui/material";



const Orders = ({setCurrentPage}:PageProp) => {
    const [search, setSearch] = useState<string>('');
    const [type, setType] = useState<string>('All');
    const [currentOrder, setCurrentOrder] = useState<OrderProps | null>(null);
    const {orders} = useFetchOrders();
    const [feedback, setFeedback] = useState<FeedbackProps>({error:false, message:''});
    const [loading, setLoading] = useState<boolean>(false);


    const handleCancelOrder = async(order:OrderProps)=>{
          const message = `Your order for ${order.title} has been cancelled`;
          try {
              setLoading(true)
              const cancelled = await cancelOrder(order?.userId, order?.id, message);
              if(cancelled){
                  setFeedback({error:false, message:'Order cancelled successfully'});
              }else{
                  setFeedback({error:true, message:'Error occured. Please retry'});
              }
          } catch (error) {
              console.log(error);
          }finally{
              setLoading(false)
          }    
    }

    const handleRestoreOrder = async(order:OrderProps)=>{
      try {
          setLoading(true)
          const restored = await restoreOrder(order?.userId, order?.id, order?.title);
          if(restored){
              setFeedback({error:false, message:'Order restored successfully'});
          }else{
              setFeedback({error:true, message:'Error occured. Please retry'});
          }
      } catch (error) {
          console.log(error);
      }finally{
          setLoading(false)
      }        
    }

    const handleCancelAll = async()=>{
      try {
        setLoading(true);
        SearchOrder(orders, search, type).filter(item=> item.status !== 'Cancelled')
        .forEach(async(item)=>{
          const message = `Your order for ${item.title} has been cancelled`;
          await cancelOrder(item?.userId, item?.id, message);
        })
          
        setFeedback({error:false, message:'Operation completed successfully'});
      } catch (error) {
        setFeedback({error:true, message:'Operation failed. Please retry'});
        console.log(error);
      }finally{
        setLoading(false);
      }
    }


    const handleApproveAll = async()=>{
      try {
        setLoading(true);
        SearchOrder(orders, search, type).filter(item=> item.status !== 'Approved')
        .forEach(async(item)=>{
          await approveOrder(item?.userId, item?.id, item?.title);   
        })
        setFeedback({error:false, message:'Operation completed successfully'});
      } catch (error) {
        setFeedback({error:true, message:'Operation failed. Please retry'});
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    const handleApproveOrder = async(order:OrderProps)=>{
      try {
          setLoading(true)
          const approved = await approveOrder(order?.userId, order?.id, order?.title);
          if(approved){
              setFeedback({error:false, message:'Order approved successfully'});
          }else{
              setFeedback({error:true, message:'Error occured. Please retry'});
          }
      } catch (error) {
          console.log(error);
      }finally{
          setLoading(false)
      }        
    }


  return (
    <section className=" flex flex-col items-center gap-8">
      <Header newsButton={false} />
      {
        feedback.message &&
        <Alert onClose={()=>setFeedback({error:false, message:''})} severity={feedback.error?'error':'success'} >{feedback.message}</Alert>
      }
      { 
        currentOrder ?
        <OrderDetails currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
        :
        <div className="flex gap-4 flex-col items-center w-[90%]">
          <div className="flex flex-row items-center justify-center gap-1 md:gap-4 self-start">
            <IoIosArrowRoundBack
              onClick={() => setCurrentPage("home")}
              size={30}
              className="cursor-pointer"
            />
            <h2 className="font-semibold text-xl md:text-2xl">Orders</h2>
          </div>
          <hr className="w-full border border-[#cb4900]" />
          <input value={search} onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="search ...." className="w-full px-3 py-2 border border-slate-200 outline-none rounded-md" />
          
          <div className="flex w-full flex-col gap-4 items-center pb-10 gro">

            <div className="flex w-full flex-row justify-between items-center">
              <select onChange={(e)=>setType(e.target.value)} className="px-3 py-2 border border-slate-200 outline-none rounded-md" name="type" title="type" defaultValue='All'>
                <option value="All" defaultChecked >All</option>
                <option value="tour">Tours</option>
                <option value="hotel">Hotels</option>
                <option value="flight">Flights</option>
              </select>
              {
                SearchOrder(orders, search, type).length > 1 &&
                <div className="flex flex-row items-center justify-center gap-4">
                  <button disabled={loading} onClick={handleApproveAll} type='button' className="rounded-md bg-[#cb4900] hover:bg-orange-400 px-2 py-1 font-semibold text-white text-[0.8rem]" >{loading ? 'wait':'Approve all'}</button>
                  <button disabled={loading} onClick={handleCancelAll} type='button' className="rounded-md border border-slate-200 hover:bg-slate-200 px-2 py-1 font-semibold text-slate-600 text-[0.8rem]" >{loading ? 'wait':'Cancel all'}</button>
                </div>
              }
            </div>

            {
              SearchOrder(orders, search, type).length > 0 ?
              SearchOrder(orders, search, type).map((order:OrderProps)=>(
                <div key={order.id} className="flex w-[98%] self-center flex-col-reverse gap-4 items-center">
                  <div className="flex py-4 border-t border-slate-400 flex-row justify-between items-center w-full">
                    <div onClick={()=>setCurrentOrder(order)} className="flex cursor-pointer flex-row gap-4 items-center">
                      <img src={order?.extras?.image} className="w-12 h-12 rounded-md object-cover" alt="image" />
                      <span className="font-semibold text-[0.9rem] md:text-[1rem] hover:underline" >{order?.title}</span>
                      <span className="font-semibold px-4 hidden md:block text-[0.9rem] md:text-[1rem] border-r-2 border-l-2 border-slate-400" >{order?.tip} {order.type === 'hotel' ?' nights': order.type==='tour'?' days':''} </span>
                    </div>

                    <div className="flex flex-row items-center justify-center gap-4">
                      {
                        order.status !== 'Approved' &&
                        <button disabled={loading} onClick={order.status === 'Cancelled' ? ()=>handleRestoreOrder(order) : ()=>handleApproveOrder(order)} type='button' className="rounded-md bg-[#cb4900] hover:bg-orange-400 px-2 py-1 font-semibold text-white text-[0.8rem]" >{order.status === 'Cancelled' ?'Restore':'Approve'}</button>
                      }
                      {
                        order.status !== 'Cancelled' &&
                        <button disabled={loading} onClick={()=>handleCancelOrder(order)} type='button' className="rounded-md border border-slate-200 hover:bg-slate-200 px-2 py-1 font-semibold text-slate-600 text-[0.8rem]" >Cancel</button>
                      }
                    </div>

                  </div>
                </div>
              ))
              :
              <span className="text-xl font-bold">No orders yet</span>
            }
          </div>
        </div>
      }
    </section>
  );
}

export default Orders