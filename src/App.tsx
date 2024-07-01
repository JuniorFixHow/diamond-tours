import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'


function App() {

  return (
    <div className='w-full' >
      <Routes>
        <Route path='/' >
          <Route index element={
              <Dashboard />
          } />
          <Route path='login' element={
              <Login />
          } />
        </Route>
      </Routes>

    </div>
  )
}

export default App
