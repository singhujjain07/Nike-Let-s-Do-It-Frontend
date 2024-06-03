import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/auth'

const VerifyPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [auth, setAuth] = useAuth();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();
    const verifyPayment = async () => {
        const res = await axios.post('/api/v1/order/verify', { success, orderId });
        if (res?.data?.success && success=="true") {
            setAuth((prevAuth) => {
                const updatedAuth = {
                    ...prevAuth,
                    user: {
                        ...prevAuth.user,
                        cart: []
                    },
                };
                localStorage.setItem('auth', JSON.stringify(updatedAuth));
                return updatedAuth;
            });
            navigate('/favorites');
        }
        else {
            navigate('/')
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [auth?.user])

    return (
        <div className='min-h-40 grid'>
            <div className="w-24 h-24 place-self-center border-2 border-t-orange-600 border-[#bdbdbd] rounded-full animate-spin ">

            </div>
        </div>
    )
}

export default VerifyPage