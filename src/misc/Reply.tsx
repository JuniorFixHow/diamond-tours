import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { ChangeEvent, Dispatch, FormEvent, RefObject, SetStateAction, useState } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { ReviewProps } from "../types/Types";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { API } from "../data/Constats";

type ReplyProps = {
    currentData: ReviewProps | null,
    replyData: ReviewProps | null,
    setReplyData: Dispatch<SetStateAction <ReviewProps | null > >,
    replyRef:RefObject<HTMLFormElement>,
    setMessage: Dispatch<SetStateAction <string > >,
    message:string,
    replyUpdateMode:boolean,
    setReplyUpdateMode:Dispatch<SetStateAction <boolean > >,  
}

const Reply = ({currentData, setReplyData, replyData, replyUpdateMode, setReplyUpdateMode, message, setMessage, replyRef}:ReplyProps) => {
    const {user} = useAuth();
    const [openEmoji, setOpenEmoji] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    // const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');


    const handleChageText=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        setMessage(e.target.value)
    }

    const handleChageTextEmoji=(e:EmojiClickData)=>{
        setMessage((pre)=>pre + e.emoji);
        setOpenEmoji(false);
    }

    // console.log(message)
    // https://dribbble.com/shots/20905560-Comment-section
    // https://dribbble.com/shots/23539942-Decoroom-Virtual-Interior-Design-App-Comments
    // https://dribbble.com/shots/17196663-Comments

    const handleSendReview = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError('');
        if(message.trim().length>0){

            try {
                setLoading(true);
                const reviewData = {
                    user:{
                        name:user? user.displayName : 'Anonymous',
                        id: user? user.id : '',
                        photo: user? user?.photoURL : 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'
                    },
                    isReply:true,
                    originalReview:currentData?._id,
                    content:message
                };
                const res = await axios.post(`${API}reviews/create`, reviewData);
                if(res.status === 200){
                    setMessage('');
                }
                // console.log(res.data);
            } catch (error) {
                setError('Error occured. Please retry');
                console.log(error);
            }finally{
                setLoading(false);
            }
        }else{
            setError('Please type something')
        }
    }
    
    const handleCancel =()=>{
        setReplyUpdateMode(false);
        setMessage('');
    }

    const handleUpdateReview = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError('');
        if(message.trim().length>0){

            try {
                setLoading(true);
                const reviewData = {
                    content:message
                };
                const res = await axios.put(`${API}reviews/${replyData?._id}`, reviewData);
                // console.log(res)
                if(res.status === 200){
                    setMessage('');
                    setReplyUpdateMode(false);
                    setReplyData(null);
                }
                // console.log(res.data);
            } catch (error) {
                setError('Error occured. Please retry');
                console.log(error);
            }finally{
                setLoading(false);
            }
        }else{
            setError('Please type something')
        }
    }

  return (
    <form onSubmit={replyUpdateMode ? handleUpdateReview : handleSendReview} ref={replyRef} className="border scroll-mt-28 mt-4 self-end border-[#6B4CF2] p-4 w-[90%] flex flex-col rounded-xl gap-4 relative" >
        <textarea value={message} onChange={handleChageText} rows={2} className="w-full p-2 border-none outline-none" placeholder="type here..." />
        {
            error &&
            <small className="text-red-500 text-[0.7rem] text-center" >{error}</small>
        }
        <hr className="bg-slate-300" />
        <div className="flex w-full flex-row justify-end items-center gap-2">
            <MdOutlineEmojiEmotions onClick={()=>setOpenEmoji(e=> !e)} size={24} className="text-slate-400 cursor-pointer" />
            {
                replyUpdateMode ?
                <>
                <button disabled={loading} type='submit' className={`${loading?'bg-slate-400': 'bg-[#6B4CF2] hover:bg-[#8a72f3]'} rounded-xl px-4 py-1 text-white `} >{loading?'wait...':'Update'}</button>
                <button onClick={handleCancel} type='button' className='rounded-xl border border-slate-400 px-4 py-1 text-black' >Cancel</button>
                </>
                :
                <button disabled={loading} type='submit' className={`${loading?'bg-slate-400': 'bg-[#6B4CF2] hover:bg-[#8a72f3]'} rounded-xl px-4 py-1 text-white `} >{loading?'wait...':'Reply'}</button>
            }
        </div>
        {
            openEmoji &&
            <div className="self-end w-80 absolute z-10 md:right-8" >
                <EmojiPicker height={400} onEmojiClick={handleChageTextEmoji} open={openEmoji} />
            </div>
        }
    </form>
  )
}

export default Reply