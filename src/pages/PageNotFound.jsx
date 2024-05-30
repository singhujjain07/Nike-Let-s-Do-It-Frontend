import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from "../components/Navbar";
import { useAuth } from '../context/auth';
import { Link, useNavigate } from 'react-router-dom'
const PageNotFound = () => {

    return (
        <div className='flex flex-col min-h-screen'>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <div className="bg-white flex-grow flex items-center justify-center">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <main className="bg-white px-6 mt-auto">
                        <div className="text-center">
                            <p className="text-8xl font-semibold text-coral-red">
                                404
                            </p>
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                            <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                            <div className="mt-10 grid sm:grid-cols-2 grid-cols-1 items-center justify-center gap-x-6">
                                <Link
                                    to="/"
                                    className="rounded-md bg-coral-red px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-red"
                                >
                                    Go back home
                                </Link>
                                <a href="#" className="max-sm:mt-2 py-2 max-sm:border border-gray-400 rounded-md text-sm font-semibold text-gray-900">
                                    Contact support <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound