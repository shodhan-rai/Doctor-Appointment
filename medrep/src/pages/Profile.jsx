import React, { useContext, useEffect } from 'react'
import { MedRepContext } from '../context/MedRepContext'

const Profile = () => {
    const { profileData, getProfileData, mToken } = useContext(MedRepContext)

    useEffect(() => {
        if (mToken) {
            getProfileData()
        }
    }, [mToken])

    return profileData && (
        <div className='m-5'>
            <div className='bg-white border rounded text-sm max-w-2xl'>
                <div className='flex items-center gap-4 p-8'>
                    <img className='w-24 h-24 rounded-full object-cover' src={profileData.image} alt="" />
                    <div>
                        <h1 className='text-2xl font-medium text-gray-700'>{profileData.name}</h1>
                        <p className='text-gray-600'>{profileData.company}</p>
                        <p className='text-gray-600'>{profileData.territory}</p>
                        <p className='text-gray-600'>ID: {profileData.employeeId}</p>
                    </div>
                </div>
                
                <div className='p-8 pt-0'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <p className='text-gray-600'>Email</p>
                            <p className='font-medium'>{profileData.email}</p>
                        </div>
                        <div>
                            <p className='text-gray-600'>Phone</p>
                            <p className='font-medium'>{profileData.phone}</p>
                        </div>
                        <div>
                            <p className='text-gray-600'>Specialization</p>
                            <p className='font-medium'>{profileData.specialization}</p>
                        </div>
                        <div>
                            <p className='text-gray-600'>Join Date</p>
                            <p className='font-medium'>{new Date(profileData.joinDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile