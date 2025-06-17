import React, { useContext, useEffect } from 'react'
import { MedRepContext } from '../context/MedRepContext'
import { assets } from '../assets/assets'

const Dashboard = () => {
    const { dashData, getDashData, mToken, meetings, getMeetings } = useContext(MedRepContext)

    useEffect(() => {
        if (mToken) {
            getDashData()
            getMeetings()
        }
    }, [mToken])

    return dashData && (
        <div className='m-5'>
            <div className='flex flex-wrap gap-3'>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.doctor_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.totalDoctors}</p>
                        <p className='text-gray-400'>Assigned Doctors</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.appointments_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.totalMeetings}</p>
                        <p className='text-gray-400'>Total Meetings</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.tick_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.completedMeetings}</p>
                        <p className='text-gray-400'>Completed Meetings</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.pending_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.scheduledMeetings}</p>
                        <p className='text-gray-400'>Scheduled Meetings</p>
                    </div>
                </div>
            </div>

            <div className='bg-white'>
                <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
                    <img src={assets.list_icon} alt="" />
                    <p className='font-semibold'>Latest Meetings</p>
                </div>

                <div className='pt-4 border border-t-0'>
                    {meetings.slice(0, 5).map((item, index) => (
                        <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-50' key={index}>
                            <img className='rounded-full w-10' src={item.doctorId.image} alt="" />
                            <div className='flex-1 text-sm'>
                                <p className='text-gray-800 font-medium'>{item.doctorId.name}</p>
                                <p className='text-gray-600'>{item.title}</p>
                            </div>
                            <div className='text-sm text-center'>
                                <p className='text-gray-600'>{new Date(item.meetingDate).toLocaleDateString()}</p>
                                <p className={`text-xs px-2 py-1 rounded-full ${
                                    item.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                    item.status === 'Scheduled' ? 'bg-blue-100 text-blue-600' :
                                    'bg-red-100 text-red-600'
                                }`}>
                                    {item.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard