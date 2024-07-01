import Home from '../components/Home'
import Appointments from '../components/Appointments'
import Messages from '../components/Messages'
import Chat from '../components/Chat'
import Newsletter from '../components/Newsletter'
import { useState } from 'react'

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
    </div>
  )
}

export default Dashboard