import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { ChangeEvent,  Dispatch,  FormEvent,  RefObject,  SetStateAction,  useState } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { API } from "../data/Constats";
import { ReviewProps } from "../types/Types";

type CommentProp = {
    formRef:RefObject<HTMLFormElement>,
    message:string,
    setMessage:Dispatch<SetStateAction <string>>
    updateMode:boolean,
    setUpdateMode:Dispatch<SetStateAction <boolean>>
    currentData:ReviewProps | null,
    setCurrentData:Dispatch<SetStateAction <ReviewProps | null>>
}

const Comment = ({formRef, message, setMessage, updateMode, setUpdateMode, currentData, setCurrentData}:CommentProp) => {
    const [openEmoji, setOpenEmoji] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const {user} = useAuth();

    const handleChageText=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        setMessage(e.target.value)
    }

    const handleChageTextEmoji=(e:EmojiClickData)=>{
        setMessage((pre)=>pre + e.emoji);
        setOpenEmoji(false);
    }

    // console.log(message)
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
                    isReply:false,
                    originalReview:'',
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
    
    const handleUpdateReview = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError('');
        if(message.trim().length>0){

            try {
                setLoading(true);
                const reviewData = {
                    content:message
                };
                const res = await axios.put(`${API}reviews/${currentData?._id}`, reviewData);
                // console.log(res)
                if(res.status === 200){
                    setMessage('');
                    setUpdateMode(false);
                    setCurrentData(null);
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
        setUpdateMode(false);
        setMessage('');
    }


  return (
    <form ref={formRef!} onSubmit={updateMode? handleUpdateReview: handleSendReview} className="scroll-mt-28 border border-[#cb4900] p-4 w-full flex flex-col rounded-xl gap-4 relative" >
        <textarea required value={message} onChange={handleChageText} rows={2} className="w-full p-2 border-none outline-none" placeholder="type here..." />
        {
            error &&
            <small className="text-red-500 text-[0.7rem] text-center" >{error}</small>
        }
        <hr className="bg-slate-300" />
        <div className="flex w-full flex-row justify-end items-center gap-2">
            <MdOutlineEmojiEmotions onClick={()=>setOpenEmoji(e=> !e)} size={24} className="text-slate-400 cursor-pointer" />
            {
                updateMode ?
                <>
                <button disabled={loading} type='submit' className={`${loading ? 'bg-slate-400': 'bg-[#cb4900] hover:bg-orange-400'} rounded-xl px-4 py-1 text-white`} >{loading ? 'Wait...':'Update'}</button>
                <button onClick={handleCancel} type='button' className='rounded-xl border border-slate-400 px-4 py-1 text-black' >Cancel</button>
                </>
                :
                <button disabled={loading} type='submit' className={`${loading ? 'bg-slate-400': 'bg-[#cb4900] hover:bg-orange-400'} rounded-xl px-4 py-1 text-white`} >{loading ? 'Wait...':'Send'}</button>
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

export default Comment