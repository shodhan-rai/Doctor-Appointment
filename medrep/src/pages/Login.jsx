
import React, { useContext, useState } from 'react'
import { MedRepContext } from '../context/MedRepContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { setMToken, backendUrl } = useContext(MedRepContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const { data } = await axios.post(backendUrl + '/api/medrep/login', { 
                email, 
                password 
            })
            
            if (data.success) {
                localStorage.setItem('mToken', data.token)
                setMToken(data.token)
                toast.success('Login Successful')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Login error:', error)
            toast.error('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <img className="mx-auto h-12 w-auto" src={assets.admin_logo} alt="Logo" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Medical Rep Login
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to your medical representative account
                    </p>
                </div>
                
                <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={onSubmitHandler}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        <p>Contact your administrator to get your login credentials</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login