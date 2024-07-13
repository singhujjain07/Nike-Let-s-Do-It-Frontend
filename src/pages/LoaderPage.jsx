import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const LoaderPage = ({ path = 'home' }) => {
    const [count, setCount] = useState(69);
    const navigate = useNavigate();
    const location = useLocation();
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoCompleted, setIsVideoCompleted] = useState(false);
    const toggleSound = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000)
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return () => clearInterval(interval);
    }, [count, navigate, location, path])

    useEffect(() => {
        const startServer = async()=>{
            const res= await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/api/v1/auth/start-server`)
        }
        startServer();
        if (videoRef.current) {
            videoRef.current.addEventListener('ended', () => {
                setIsVideoCompleted(true);
            });
        }
        // Cleanup event listener on component unmount
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('ended', () => {
                    setIsVideoCompleted(true);
                });
            }
        };
    }, []);
    return (
        <div className="flex bgDark flex-col justify-center items-center h-screen">
            {!isVideoCompleted && (
                <div className="relative w-full h-full">
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        autoPlay
                        muted={isMuted}
                        ref={videoRef}
                    >
                        <source src="/Magista.mp4" type="video/mp4" />
                    </video>
                    <button
                        onClick={toggleSound}
                        className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-2 rounded"
                    >
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                    <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-2 rounded">
                        <h1 className='text-center text-xl text-gray-400'>YOUR PAGE IS BUILDING!</h1>
                        <h1 className='text-center text-gray-500'>Thank You For Your Patience</h1>
                        <h1 className='text-center text-gray-500'>redirecting to you in {count}</h1>
                    </div>
                </div>
            )}
            {isVideoCompleted && (
                <div>
                    <h1 className='text-center text-xl text-gray-400'>YOUR PAGE IS BUILDING!</h1>
                    <h1 className='text-center text-gray-500'>Thank You For Your Patience</h1>
                    <h1 className='text-center text-gray-500'>redirecting to you in {count}</h1>
                </div>
            )}
        </div>
    )
}

export default LoaderPage