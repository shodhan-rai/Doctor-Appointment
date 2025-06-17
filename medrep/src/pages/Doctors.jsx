import React, { useContext, useEffect } from 'react'
import { MedRepContext } from '../context/MedRepContext'

const Doctors = () => {
    const { doctors, getAssignedDoctors, mToken } = useContext(MedRepContext)

    useEffect(() => {
        if (mToken) {
            getAssignedDoctors()
        }
    }, [mToken])

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>Assigned Doctors</h1>
            <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
                {doctors.map((item, index) => (
                    <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                        <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
                        <div className='p-4'>
                            <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                            <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                            <div className='mt-2 flex items-center gap-1 text-sm'>
                                <input type="checkbox" checked={item.available} readOnly />
                                <p>Available</p>
                            </div>
                            <p className='text-gray-500 font-medium mt-1'>{item.experience}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Doctors