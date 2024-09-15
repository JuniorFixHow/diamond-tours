import Header from './components/Header'

import Contact from './components/Contact';
import Footer from './components/Footer';

import Reviews from './components/Reviews';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './news/Blogs';
import FeaturedBlogs from './news/Featured';
import SingleBlog from './news/SingleBlog';
import { useState } from 'react';
import ChatBtn from './components/ChatBtn';
import Chat from './components/Chat';
// import './App.css'

function App() {
  const [showChat, setShowChat] = useState<boolean>(false);

  return (
    <div className='relative z-10' >
    <Header />
    <ChatBtn showChat={showChat} setShowChat={setShowChat} />
    <Chat showChat={showChat} setShowChat={setShowChat} />
    <Routes>
      <Route index element={<Home />} />
      <Route path='/blogs' >
        <Route index element={<FeaturedBlogs />} />
        <Route path='list' element={<Blogs />} />
        <Route path=':id' element={<SingleBlog />} />
      </Route>
     
    </Routes>
    <div className='w-full relative -z-20 items-center justify-center flex flex-col' >
      <Contact />
      <Reviews />
    </div>
    <Footer />
    </div>
  )
}

export default App
