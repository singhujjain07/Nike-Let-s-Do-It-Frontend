import React from 'react'
import Navbar from '../components/Navbar'

const AboutUsPage = () => {
    return (
        <div className='bg-[#ECEEFE] h-screen'>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <div className="pt-24">
                <div className="bg-white mx-auto lg:mx-16 xl:mx-auto max-w-2xl px-8 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                    Todo: <br />

                    <div className='bg-green-100'>
                        1. Payment Gateway -almost done<br />
                        2. My orders page -almost done<br />
                        3. Product updation after order <br />
                        4. create context for sort and and filters <br />
                        5. create routes for admin access only -{`>`} dashboard <br />
                    </div>

                    <div className='bg-yellow-100'>
                        x. Homepage
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage