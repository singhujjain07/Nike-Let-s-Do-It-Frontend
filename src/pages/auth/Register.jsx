import React, { useState } from 'react'
import axios from 'axios';
import { headerLogo, footerLogo } from '../../assets/images'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    // form function
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            if(password !=confirmPassword){
                toast.error("Passwords not matching");
                return;
            }
            const res = await axios.post("/api/v1/auth/register",
                { name, email, password, phone }
            )
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login')
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }
    return (
        <div className="flex min-h-full sm:h-screen flex-1 flex-col justify-center  px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src={headerLogo} alt="Your Company" />
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6" >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Full Name
                        </label>
                        <div className="mt-2">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name="full_name"
                                type="text"
                                autoComplete="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone No
                        </label>
                        <div className="mt-2">
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                name="phone"
                                type="phone"
                                autoComplete="phone"
                                required
                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                            Confirm Password
                        </label>
                        <div className="mt-2">
                            <input
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-coral-red px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <Link to="/login" className="font-semibold leading-6 text-coral-red hover:text-red-600">
                        Sign In!
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register