import {  useEffect,  } from 'react'
// import ChatBtn from '../components/ChatBtn'
// import Chat from '../components/Chat'
// import Hero from '../components/Hero'
import Services from '../components/Services'
import Packages from '../components/Packages'
import Bookings from '../components/Bookings'
import About from '../components/About'
import Swipper from '../misc/Swipper'
import AvailablePackages from '../components/AvailablePackages'


const Home = () => {
    // const [showChat, setShowChat] = useState<boolean>(false);
    useEffect(() => {
      const hash = window.location.hash;
      if (hash) {
          const element = document.getElementById(hash.substring(1));
          if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
          }
      }
  }, []);
  return (
    <div className='relative -z-10' >
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578473026963707"
     crossOrigin='anonymous' ></script>
    {/* <ChatBtn showChat={showChat} setShowChat={setShowChat} />
    <Chat showChat={showChat} setShowChat={setShowChat} /> */}
    {/* <Hero /> */}
    <Swipper />
    <div className='flex flex-col items-center justify-center w-full' >
      <Services />
      <Packages />
      <AvailablePackages/>
      <Bookings />
      <About />
      
    </div>
    </div>
  )
}

export default Home