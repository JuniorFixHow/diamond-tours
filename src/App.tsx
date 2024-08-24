import ChatBtn from './components/ChatBtn'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Packages from './components/Packages';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chat from './components/Chat';
import { useState } from 'react';
import Bookings from './components/Bookings';
import Reviews from './components/Reviews';
// import './App.css'

function App() {
  const [showChat, setShowChat] = useState<boolean>(false);
  return (
    <div className='relative' >
    <Header />
    <ChatBtn showChat={showChat} setShowChat={setShowChat} />
    <Chat showChat={showChat} setShowChat={setShowChat} />
    <Hero />
    <div className='w-full items-center justify-center flex flex-col' >
      <Services />
      <Packages />
      <Bookings />
      <About />
      <Contact />
      <Reviews />
    </div>
    <Footer />
    </div>
  )
}

export default App
