import {useState,useEffect} from 'react'
import { useAuth } from '../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import UnauthorizedSpinner from './UnauthorizedSpinner';

export default function AdminRoutes(){
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const authCheck = async ()=>{
            const res = await axios.post('/api/v1/auth/admin-auth',{userId:auth.user._id})
            console.log(res)
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        }
        if(auth?.token){
            authCheck();
        }
    },[auth?.token]);
    return ok ? <Outlet/> : <UnauthorizedSpinner path=''/>;
}