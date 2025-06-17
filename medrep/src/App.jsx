import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Doctors from './pages/Doctors'
import Meetings from './pages/Meetings'
import ScheduleMeeting from './pages/ScheduleMeeting'
import Profile from './pages/Profile'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { MedRepContext } from './context/MedRepContext'

function App() {
  const { mToken } = useContext(MedRepContext)

  return mToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/meetings' element={<Meetings />} />
          <Route path='/schedule-meeting' element={<ScheduleMeeting />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App