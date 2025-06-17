import React, { useContext, useEffect, useState } from 'react'
import { MedRepContext } from '../context/MedRepContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const ScheduleMeeting = () => {
    const { doctors, getAssignedDoctors, mToken, backendUrl } = useContext(MedRepContext)
    
    const [doctorId, setDoctorId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [meetingDate, setMeetingDate] = useState('')
    const [meetingTime, setMeetingTime] = useState('')
    const [location, setLocation] = useState('')
    const [meetingType, setMeetingType] = useState('In-Person')
    const [agenda, setAgenda] = useState('')

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!doctorId || !title || !meetingDate || !meetingTime || !location) {
                return toast.error('Please fill all required fields')
            }

            const meetingDateTime = new Date(`${meetingDate}T${meetingTime}`)
            const agendaArray = agenda.split(',').map(item => item.trim()).filter(item => item)

            const { data } = await axios.post(backendUrl + '/api/medrep/schedule-meeting', {
                doctorId,
                title,
                description,
                meetingDate: meetingDateTime,
                location,
                meetingType,
                agenda: agendaArray
            }, { headers: { mToken } })

            if (data.success) {
                toast.success(data.message)
                setDoctorId('')
                setTitle('')
                setDescription('')
                setMeetingDate('')
                setMeetingTime('')
                setLocation('')
                setMeetingType('In-Person')
                setAgenda('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (mToken) {
            getAssignedDoctors()
        }
    }, [mToken])

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Schedule New Meeting</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Select Doctor</p>
                            <select 
                                onChange={(e) => setDoctorId(e.target.value)} 
                                value={doctorId} 
                                className='border rounded px-3 py-2'
                                required
                            >
                                <option value="">Select Doctor</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor._id} value={doctor._id}>
                                        {doctor.name} - {doctor.speciality}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Meeting Title</p>
                            <input 
                                onChange={(e) => setTitle(e.target.value)} 
                                value={title} 
                                className='border rounded px-3 py-2' 
                                type="text" 
                                placeholder="e.g., Product Presentation"
                                required 
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Description</p>
                            <textarea 
                                onChange={(e) => setDescription(e.target.value)} 
                                value={description} 
                                className='border rounded px-3 py-2' 
                                placeholder="Meeting description"
                                rows="3"
                            />
                        </div>

                        <div className='flex gap-4'>
                            <div className='flex-1 flex flex-col gap-1'>
                                <p>Meeting Date</p>
                                <input 
                                    onChange={(e) => setMeetingDate(e.target.value)} 
                                    value={meetingDate} 
                                    className='border rounded px-3 py-2' 
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    required 
                                />
                            </div>

                            <div className='flex-1 flex flex-col gap-1'>
                                <p>Meeting Time</p>
                                <input 
                                    onChange={(e) => setMeetingTime(e.target.value)} 
                                    value={meetingTime} 
                                    className='border rounded px-3 py-2' 
                                    type="time"
                                    required 
                                />
                            </div>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Location</p>
                            <input 
                                onChange={(e) => setLocation(e.target.value)} 
                                value={location} 
                                className='border rounded px-3 py-2' 
                                type="text" 
                                placeholder="Meeting location"
                                required 
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Meeting Type</p>
                            <select 
                                onChange={(e) => setMeetingType(e.target.value)} 
                                value={meetingType} 
                                className='border rounded px-3 py-2'
                            >
                                <option value="In-Person">In-Person</option>
                                <option value="Virtual">Virtual</option>
                                <option value="Phone">Phone</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Agenda (comma-separated)</p>
                            <textarea 
                                onChange={(e) => setAgenda(e.target.value)} 
                                value={agenda} 
                                className='border rounded px-3 py-2' 
                                placeholder="Product demo, Side effects discussion, Pricing"
                                rows="2"
                            />
                        </div>

                        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>
                            Schedule Meeting
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ScheduleMeeting