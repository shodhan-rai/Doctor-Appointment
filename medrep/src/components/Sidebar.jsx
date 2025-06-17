import React, { useContext } from 'react'
import { MedRepContext } from '../context/MedRepContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const { mToken } = useContext(MedRepContext)

    return (
        <div className='min-h-screen bg-white border-r'>
            {mToken && (
                <ul className='text-[#515151] mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/'}>
                        <img src={assets.home_icon} alt="" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctors'}>
                        <img src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Assigned Doctors</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/meetings'}>
                        <img src={assets.appointments_icon} alt="" />
                        <p className='hidden md:block'>All Meetings</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/schedule-meeting'}>
                        <img src={assets.add_icon} alt="" />
                        <p className='hidden md:block'>Schedule Meeting</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/products'}>
                        <img src={assets.list_icon} alt="" />
                        <p className='hidden md:block'>Products</p>
                    </NavLink>
                </ul>
            )}
        </div>
    )
}

export default Sidebar