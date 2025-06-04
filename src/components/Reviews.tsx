import {  useEffect, useRef, useState } from "react"
import Comment from "../misc/Comment"
import { ReviewProps } from "../types/Types"
import axios from "axios";
import { API } from "../data/Constats";
import { IoTrashOutline } from "react-icons/io5";
import { LuPen } from "react-icons/lu";
import { BsReply } from "react-icons/bs";
import { FaEllipsis } from "react-icons/fa6";
import { checkTimeSince } from "@juniorfixhow/durationjs";
import Reply from "../misc/Reply";
import CommentReplies from "../misc/CommentReplies";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { useAuth } from "../hooks/useAuth";


const Reviews = () => {
  const {user} = useAuth();

  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [replies, setReplies] = useState<ReviewProps[]>([]);
  const [currentData, setCurrentData] = useState<ReviewProps | null>(null);
  const [replyData, setReplyData] = useState<ReviewProps | null>(null);
  const [openReply, setOpenReply] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [replyUpdateMode, setReplyUpdateMode] = useState<boolean>(false);
  const [replyMode, setReplyMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [viewRange, setViewRange] = useState<number>(-5);
  const [dataLength, setDataLength] = useState<number>(0);
  const [viewAll, setViewAll] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const replyRef = useRef<HTMLFormElement>(null);

  const adminRights = (data:ReviewProps):boolean=>{
    if((data.user.id === user?.id) || (user?.id === '3UQfOt5C78RiHyRXLIRLnWiFN412')){
      return true
    }else{
      return false;
    }
  }

  const handleScroll = (data:ReviewProps)=>{
    formRef.current?.scrollIntoView({behavior:'smooth'});
    setUpdateMode(true);
    setCurrentData(data);
    setMessage(data.content);
  }

  const viewReplies = (data:ReviewProps)=>{
    setCurrentData(data)
    setReplyMode(true);
    setOpenReply(false);
  }
  const hideReplies = ()=>{
    // setCurrentData(data)
    setReplyMode(false);
    setOpenReply(false);
  }
  
  // let allData:number;
    useEffect(()=>{
      const fetchData = async()=>{
        try {
          const res = await axios.get(`${API}reviews`);
          // console.log(res)
          if(res.status===201){
            const data = res.data as ReviewProps[]
            setReviews(data.filter((item)=> !item.isReply).slice(viewRange));
            setReplies(data.filter((item)=> item.isReply));
            setDataLength(data.filter((item)=> !item.isReply).length + 1)
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    },[reviews, replies, viewRange])

    const viewTrigger = ()=>{
      if(viewAll){
        setViewAll(false);
        setViewRange(-5)
      }else{
        setViewAll(true);
        setViewRange(-dataLength);
      }
    }
    // console.log( 'hello: ',new Date(reviews[0].createdAt!))
    const handleReplyBtn = async(data:ReviewProps)=>{
      if(openReply && currentData?._id === data._id){
        setOpenReply(false)
      }else{
        setCurrentData(data);
        setOpenReply(true);
        // setUpdateMode(false);
      }
    }
    
    const handleReplyModeBtn = async(data:ReviewProps)=>{
      if(replyMode && currentData?._id === data._id){
        setReplyMode(false)
      }else{
        setCurrentData(data);
        setReplyMode(true);
        // setUpdateMode(false);
      }
    }
    const deleteReviev =async(id:string)=>{
      try {
         const res = await axios.delete(`${API}reviews/${id}`);
         console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

    // const updateReply

    return (
      <section
      
        id="reviews"
        className="flex flex-col w-full py-8 bg-white scroll-mt-14"
      >
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578473026963707"
     crossOrigin='anonymous' ></script>
        <div className="flex flex-col self-center w-5/6 gap-6">
          <h2 className="text-2xl font-bold text-center text-black sm:text-3xl md:text-left">
            Reviews
          </h2>
          <Comment
            currentData={currentData}
            setCurrentData={setCurrentData}
            updateMode={updateMode}
            setUpdateMode={setUpdateMode}
            message={message}
            setMessage={setMessage}
            formRef={formRef}
          />

          {reviews.length > 0 &&
            reviews.sort((a, b)=>new Date(a.createdAt!) < new Date(b.createdAt!) ? 1:-1).map((review: ReviewProps) => (
              <div
                key={review._id}
                className="flex flex-col w-full pb-6 border-b border-slate-300"
              >
                <div className="flex flex-row items-center justify-between">
                  <div
                    onClick={() => setOpenReply(false)}
                    className="flex flex-row items-center gap-2"
                  >
                    <img
                      src={review?.user.photo}
                      className="object-cover w-8 h-8 rounded-full"
                      alt=""
                    />
                    <span className="font-semibold">
                      {review?.user.name?.split(" ")[0]?.slice(0, 20)}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <FaEllipsis
                      onClick={() => handleReplyBtn(review)}
                      className="z-10 cursor-pointer"
                    />
                    {openReply && currentData?._id === review._id && !replyMode &&
                      <button
                        className="text-[0.7rem] shadow py-1 md:py-2 px-2 rounded hover:bg-slate-100"
                        type="button"
                        onClick={()=>viewReplies(review)}
                      >
                        View Replies
                      </button>
                      
                    }
                    {
                      openReply && currentData?._id === review._id && replyMode &&
                      <button
                        className="text-[0.7rem] shadow py-1 md:py-2 px-2 rounded hover:bg-slate-100"
                        type="button"
                        onClick={hideReplies}
                      >
                        Hide Replies
                      </button>
                    }
                  </div>
                </div>

                <div
                  onClick={() => setOpenReply(false)}
                  className="flex flex-col gap-2 pl-12"
                >
                  <span>{review.content}</span>
                  <div className="flex flex-row items-center gap-4">
                    <BsReply onClick={()=>handleReplyModeBtn(review)} size={16} className="cursor-pointer" />
                    {
                      adminRights(review) &&
                      <>
                      <LuPen
                        onClick={() => handleScroll(review)}
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

                {
                  replyMode && currentData?._id === review._id &&
                  <>
                  <Reply replyData={replyData} setReplyData={setReplyData} replyUpdateMode={replyUpdateMode} setReplyUpdateMode={setReplyUpdateMode} message={replyMessage} setMessage={setReplyMessage} replyRef={replyRef} currentData={currentData}  />
                  <CommentReplies adminRight={adminRights} setReplyData={setReplyData} setReplyUpdateMode={setReplyUpdateMode} currentData={currentData} replies={replies} replyRef={replyRef} setReplyMessage={setReplyMessage} />
                  </>
                }
               
              </div>
            ))}

            {
              dataLength > 5 &&
              <div onClick={viewTrigger} className="flex flex-row items-center gap-4 underline cursor-pointer">
                <span className="font-semibold" >{viewAll ? 'Show less': 'Show more'}</span>
                {
                  viewAll ? 
                  <CiCircleChevUp size={24} />
                  :
                  <CiCircleChevDown size={24} />
                }
              </div>
            }
        </div>

      </section>
    );
  }
  
  export default Reviews