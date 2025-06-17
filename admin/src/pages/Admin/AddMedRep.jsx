import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddMedRep = () => {
    const [medRepImg, setMedRepImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [company, setCompany] = useState('')
    const [territory, setTerritory] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [specialization, setSpecialization] = useState('General Medicine')
    const [phone, setPhone] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!medRepImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('company', company)
            formData.append('territory', territory)
            formData.append('employeeId', employeeId)
            formData.append('specialization', specialization)
            formData.append('phone', phone)
            formData.append('image', medRepImg)

            // console log formdata
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`)
            })

            const { data } = await axios.post(backendUrl + '/api/admin/add-medrep', formData, {
                headers: { aToken }
            })

            if (data.success) {
                toast.success(data.message)
                setMedRepImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setCompany('')
                setTerritory('')
                setEmployeeId('')
                setPhone('')
                setSpecialization('General Medicine')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Medical Representative</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="med-img">
                        <img 
                            className='w-16 bg-gray-100 rounded-full cursor-pointer' 
                            src={medRepImg ? URL.createObjectURL(medRepImg) : assets.upload_area} 
                            alt="" 
                        />
                    </label>
                    <input onChange={(e) => setMedRepImg(e.target.files[0])} type="file" id="med-img" hidden />
                    <p>Upload medical rep <br /> picture</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Name</p>
                            <input 
                                onChange={(e) => setName(e.target.value)} 
                                value={name} 
                                className='border rounded px-3 py-2' 
                                type="text" 
                                placeholder="Name" 
                                required 
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Email</p>
                            <input 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email} 
                                className='border rounded px-3 py-2' 
                                type="email" 
                                placeholder="Email" 
                                required 
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Password</p>
                            <input 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                                className='border rounded px-3 py-2' 
                                type="password" 
                                placeholder="Password" 
                                required 
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Phone</p>
                            <input 
                                onChange={(e) => setPhone(e.target.value)} 
                                value={phone} 
                                className='border rounded px-3 py-2' 
                                type="tel" 
                                placeholder="Phone" 
                                required 
                            />
                        </div>
                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Company</p>
                            <input 
                                onChange={(e) => setCompany(e.target.value)} 
                                value={company} 
                                className='border rounded px-3 py-2' 
                                type="text" 
                                placeholder="Company Name" 
                                required 
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Territory</p>
                            <input 
                                onChange={(e) => setTerritory(e.target.value)} 
                                value={territory} 
                                className='border rounded px-3 py-2' 
                                type="text" 
                                placeholder="Territory/Region" 
                                required 
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Employee ID</p>
                            <input 
                                onChange={(e) => setEmployeeId(e.target.value)} 
                                value={employeeId} 
                                className='border rounded px-3 py-2' 
                                type="text" 
                                placeholder="Employee ID" 
                                required 
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Specialization</p>
                            <select 
                                onChange={(e) => setSpecialization(e.target.value)} 
                                value={specialization} 
                                className='border rounded px-3 py-2'
                            >
                                <option value="General Medicine">General Medicine</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Gastroenterology">Gastroenterology</option>
                                <option value="Gynecology">Gynecology</option>
                                <option value="Orthopedics">Orthopedics</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>
                    Add Medical Rep
                </button>
            </div>
        </form>
    )
}

export default AddMedRep