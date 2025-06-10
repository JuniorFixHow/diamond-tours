import { MdOutlineMessage } from "react-icons/md";

// const ChatBtn = ({showChat, setShowChat}:ShowChatProps) => {
const ChatBtn = () => {
  // const [showError, setShowError] = useState<boolean>(false);
  // const showStyle = "";

  // const {user} = useAuth();

  const handleBtnPress = ()=>{
    window.open('https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/16/07/20250416070450-RU1AODKE.json', '_blank', 'noopener,noreferrer');
  }

  // if(showError) return <Alert onClose={()=>setShowError(false)} className="fixed self-center w-5/6 top-16 left-10 lg:left-60 lg:w-1/2" severity='error' variant='standard' >Please sign in to access live chat</Alert>
  
  return (
    <div onClick={handleBtnPress} className='fixed z-20 flex flex-col items-center cursor-pointer bottom-16 md:bottom-6 right-8' >
      {
      }
        <MdOutlineMessage className="text-[#CB4900] hover:text-orange-400 text-4xl sm:text-4xl" />
        <span className="hidden text-xl font-semibold text-black sm:block" >Chat With Us</span>
    </div>
  )
}

export default ChatBtn