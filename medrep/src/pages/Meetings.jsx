import React, { useContext, useEffect } from 'react'
import { MedRepContext } from '../context/MedRepContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Meetings = () => {
    const { mToken, meetings, getMeetings, backendUrl } = useContext(MedRepContext)

    const updateMeetingStatus = async (meetingId, status) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/medrep/update-meeting', {
                meetingId,
                status
            }, { headers: { mToken } })

            if (data.success) {
                toast.success(data.message)
                getMeetings()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (mToken) {
            getMeetings()
        }
    }, [mToken])

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Meetings</p>
            
            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Doctor</p>
                    <p>Date</p>
                    <p>Title</p>
                    <p>Type</p>
                    <p>Status</p>
                    <p>Action</p>
                </div>

                {meetings.map((item, index) => (
                    <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                        <p className='max-sm:hidden'>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <img src={item.doctorId.image} className='w-8 rounded-full' alt="" />
                            <p>{item.doctorId.name}</p>
                        </div>
                        <p className='max-sm:hidden'>{new Date(item.meetingDate).toLocaleDateString()}</p>
                        <p>{item.title}</p>
                        <p>{item.meetingType}</p>
                        <div className='flex'>
                            <p className={`text-xs inline border px-2 rounded-full ${
                                item.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' :
                                item.status === 'Completed' ? 'bg-green-50 text-green-600' :
                                item.status === 'Cancelled' ? 'bg-red-50 text-red-600' :
                                'bg-gray-50 text-gray-600'
                            }`}>
                                {item.status}
                            </p>
                        </div>

                        <div className='flex gap-1'>
                            {item.status === 'Scheduled' && (
                                <>
                                    <img 
                                        onClick={() => updateMeetingStatus(item._id, 'Completed')} 
                                        className='w-10 cursor-pointer' 
                                        src={assets.tick_icon} 
                                        alt="Complete" 
                                    />
                                    <img 
                                        onClick={() => updateMeetingStatus(item._id, 'Cancelled')} 
                                        className='w-10 cursor-pointer' 
                                        src={assets.cancel_icon} 
                                        alt="Cancel" 
                                    />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Meetings