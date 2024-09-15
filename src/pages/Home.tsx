import {  useEffect,  } from 'react'
// import ChatBtn from '../components/ChatBtn'
// import Chat from '../components/Chat'
// import Hero from '../components/Hero'
import Services from '../components/Services'
import Packages from '../components/Packages'
import Bookings from '../components/Bookings'
import About from '../components/About'
import Swipper from '../misc/Swipper'

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
    {/* <ChatBtn showChat={showChat} setShowChat={setShowChat} />
    <Chat showChat={showChat} setShowChat={setShowChat} /> */}
    {/* <Hero /> */}
    <Swipper />
    <div className='w-full items-center justify-center flex flex-col' >
      <Services />
      <Packages />
      <Bookings />
      <About />
      
    </div>
    </div>
  )
}

export default Home