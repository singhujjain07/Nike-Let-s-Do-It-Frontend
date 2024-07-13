
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
const UnauthorizedSpinner = ({ path = 'home' }) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000)
        count === 0 && navigate(`/home`, {
            state: location.pathname
        })
        return () => clearInterval(interval);
    }, [count, navigate, location, path])

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className='text-center text-xl'>Unauthorized Access</h1>
                <h1 className='text-center'>redirecting to you in {count}</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default UnauthorizedSpinner