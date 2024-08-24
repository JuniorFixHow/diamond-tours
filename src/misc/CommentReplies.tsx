import { checkTimeSince } from '@juniorfixhow/durationjs'
import { IoTrashOutline } from 'react-icons/io5'
import { LuPen } from 'react-icons/lu'
import { ReviewProps } from '../types/Types'
import { Dispatch, RefObject, SetStateAction } from 'react'
import axios from 'axios'
import { API } from '../data/Constats'

type CommentRepliesProps={
    currentData: ReviewProps | null,
    setReplyData: Dispatch<SetStateAction <ReviewProps | null>>,
    replies:ReviewProps[],
    replyRef:RefObject<HTMLFormElement>,
    setReplyMessage:Dispatch<SetStateAction <string>> 
    setReplyUpdateMode:Dispatch<SetStateAction <boolean>>,
    adminRight:(data:ReviewProps)=>boolean 
}

const CommentReplies = ({currentData, setReplyData, replyRef, adminRight, setReplyMessage, setReplyUpdateMode, replies}:CommentRepliesProps) => {

    const handleRepyScroll = (data:ReviewProps)=>{
        replyRef.current?.scrollIntoView({behavior:'smooth'});
        setReplyUpdateMode(true);
        setReplyData(data);
        setReplyMessage(data.content);
    }

    const deleteReviev =async(id:string)=>{
        try {
           const res = await axios.delete(`${API}reviews/${id}`);
           console.log(res);
        } catch (error) {
          console.log(error);
        }
    }

  return (
    <section
        id="reviews"
        className="w-full scroll-mt-14 bg-white flex flex-col py-8"
      >
        <div className="w-5/6 self-center flex flex-col gap-6">
          {/* <h2 className="text-black text-2xl sm:text-3xl font-bold text-center md:text-left">
            Reviews
          </h2> */}
          

          {replies.length > 0 &&
            replies.filter((item)=>item.originalReview === currentData?._id).sort((a, b)=>new Date(a.createdAt!) > new Date(b.createdAt!) ? 1:-1).map((review: ReviewProps) => (
              <div
                key={review._id}
                className="flex flex-col w-full border-b border-slate-300 pb-6"
              >
                <div className="flex flex-row items-center justify-between">
                  <div
                    className="flex gap-2 flex-row items-center"
                  >
                    <img
                      src={review?.user.photo}
                      className="h-8 w-8 object-cover rounded-full"
                      alt=""
                    />
                    <span className="font-semibold">
                      {review?.user.name?.split(" ")[0]?.slice(0, 20)}
                    </span>
                  </div>

                  
                </div>

                <div
                  className="flex flex-col gap-2 pl-12"
                >
                  <span>{review.content}</span>
                  <div className="flex flex-row items-center gap-4">
                    {
                        adminRight(review) &&
                        <>
                        <LuPen
                        onClick={() => handleRepyScroll(review)}
                        size={16}
                        className="cursor-pointer"
                        />
                        <IoTrashOutline onClick={()=>deleteReviev(review._id)} size={16} className="cursor-pointer" />
                        </>
                    }
                    <small className="text-[0.7rem] text-slate-500">
                      {checkTimeSince(new Date(review.createdAt!)) == 'just now'  ? 'just now' : checkTimeSince(new Date(review.createdAt!)) + ' ago'}
                    </small>
                  </div>
                </div>

                
              </div>
            ))}
        </div>
      </section>
  )
}

export default CommentReplies