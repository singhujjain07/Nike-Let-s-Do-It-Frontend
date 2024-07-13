import { useContext, useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import { DarkModeContext } from '../context/dark'


const AboutUsPage = () => {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);
    const toggleSound = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };
    const [darkMode, setDarkMode] = useContext(DarkModeContext);

    return (
        <div className={`${darkMode ? 'bgDark' : 'bg-[#ECEEFE]'} h-full`}>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <div className={`isolate px-6 py-24 sm:py-32 lg:px-8`}>
                <div
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className={`${darkMode ? 'text-gray-300 ' : 'text-gray-900 '} text-3xl max-sm:text-xl font-bold tracking-tight font-cursive`}>
                        Company
                    </h2>
                    <h2 className={`${darkMode ? 'text-gray-300 ' : 'text-gray-900 '} text-8xl max-sm:text-4xl font-bold tracking-tight font-palanquin`}>
                        WELCOME TO <br /> NIKE, INC.
                    </h2>
                </div>
                <div className="relative w-full h-full mt-12">
                    <video
                        className=" top-0 left-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        ref={videoRef}
                        muted={isMuted}
                    >
                        <source src="/Magista.mp4" type="video/mp4" />
                    </video>
                    <button
                        onClick={toggleSound}
                        className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-2 rounded"
                    >
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                </div>
                <div className="mx-auto max-w-5xl text-center mt-24">
                    <h2 className={`${darkMode ? 'text-gray-300 ' : 'text-gray-900 '} text-4xl max-md:text-2xl max-sm:text-xl font-medium tracking-tight font-palanquin`}>
                    NIKE, Inc. is a team comprised of the Nike, Jordan and Converse brands driven by a shared purpose to leave an enduring impact.
                    </h2>
                </div>
                <div className="  mt-24">
                    <h2 className={`${darkMode ? 'text-gray-300 ' : 'text-gray-900 '} text-3xl max-sm:text-lg font-medium tracking-tight font-palanquin`}>
                        Who We Are
                    </h2>
                    <img className='w-full h-full object-cover' src="/images/about.webp" alt="" />
                </div>
                <div className="mx-auto max-w-5xl text-center mt-24">
                    <h2 className={`${darkMode ? 'text-gray-300 ' : 'text-gray-900 '} text-4xl max-md:text-2xl max-sm:text-xl font-medium tracking-tight font-palanquin`}>
                    With a global footprint, culture of innovation and team-first mentality, we take action to create a future of continual progress for athletes, sport and our world.
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage