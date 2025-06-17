import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MedRepsList = () => {
    const [medReps, setMedReps] = useState([])
    const { aToken, backendUrl } = useContext(AdminContext)

    const getAllMedReps = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-medreps', {}, {
                headers: { aToken }
            })
            if (data.success) {
                setMedReps(data.medReps)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (aToken) {
            getAllMedReps()
        }
    }, [aToken])

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Medical Representatives</h1>
            <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
                {medReps.map((item, index) => (
                    <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                        <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
                        <div className='p-4'>
                            <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                            <p className='text-zinc-600 text-sm'>{item.company}</p>
                            <p className='text-zinc-600 text-xs'>{item.territory}</p>
                            <p className='text-zinc-600 text-xs'>ID: {item.employeeId}</p>
                            <div className='mt-2 flex items-center gap-1 text-sm'>
                                <input type="checkbox" checked={item.isActive} readOnly />
                                <p>Active</p>
                            </div>
                            <p className='text-gray-500 font-medium mt-1'>{item.specialization}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MedRepsList