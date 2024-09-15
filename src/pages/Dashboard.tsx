import Home from '../components/Home'
import Appointments from '../components/Appointments'
import Messages from '../components/Messages'
import Chat from '../components/Chat'
import Newsletter from '../components/Newsletter'
import { useState } from 'react'
import Orders from '../components/Orders'
import Tours from '../components/Tours'
import Hotels from '../components/Hotels'
import Flights from '../components/Flights'
import Blogs from '../components/Blogs'

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<string>('home')
  return (
    <div>
      {
        currentPage === 'home' &&
        <Home setCurrentPage={setCurrentPage} />
      }
      {
        currentPage === 'appointments' &&
        <Appointments setCurrentPage={setCurrentPage} />
      }
      {
        currentPage === 'messages' &&
      <Messages setCurrentPage={setCurrentPage} />
      }
      {
        currentPage === 'news' &&
        <Newsletter setCurrentPage={setCurrentPage} />
      }
      {
        currentPage === 'chats' &&
        <Chat setCurrentPage={setCurrentPage} />
      }
      {
        currentPage === 'orders' &&
        <Orders setCurrentPage={setCurrentPage} />
      }
      {
        currentPage === 'tours' &&
        <Tours setCurrentPage={setCurrentPage} />
      }
      {
        currentPage === 'hotels' &&
        <Hotels setCurrentPage={setCurrentPage} />
      }
      {
        currentPage === 'flights' &&
        <Flights setCurrentPage={setCurrentPage} />
      }
      {
        currentPage === 'blogs' &&
        <Blogs setCurrentPage={setCurrentPage} />
      }
    </div>
  )
}

export default Dashboard