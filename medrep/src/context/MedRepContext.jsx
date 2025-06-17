import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const MedRepContext = createContext()

const MedRepContextProvider = (props) => {
    const [mToken, setMToken] = useState(localStorage.getItem('mToken') ? localStorage.getItem('mToken') : '')
    const [meetings, setMeetings] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)
    const [doctors, setDoctors] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/medrep/dashboard', { headers: { mToken } })
            if (data.success) {
                setDashData(data.stats)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getMeetings = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/medrep/meetings', { headers: { mToken } })
            if (data.success) {
                setMeetings(data.meetings.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/medrep/profile', { headers: { mToken } })
            if (data.success) {
                setProfileData(data.profileData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getAssignedDoctors = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/medrep/doctors', { headers: { mToken } })
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        mToken, setMToken,
        backendUrl,
        meetings, setMeetings, getMeetings,
        dashData, getDashData,
        profileData, getProfileData,
        doctors, getAssignedDoctors
    }

    return (
        <MedRepContext.Provider value={value}>
            {props.children}
        </MedRepContext.Provider>
    )
}

export default MedRepContextProvider