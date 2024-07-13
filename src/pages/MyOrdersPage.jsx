import React, { useContext, useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import { useAuth } from '../context/auth';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../context/dark';

const MyOrdersPage = () => {
    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);
    const [darkMode,setDarkMode] = useContext(DarkModeContext);
    const fetchOrders = async () => {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/api/v1/order/user/orders`, { userId: auth?.user?._id });
        if (res?.data?.success) {
            console.log(res?.data?.orders)
            setOrders(res?.data?.orders);
        }
    }
    useEffect(() => {
        fetchOrders();
    }, [auth?.user])
    return (
        <div className={`${darkMode ? ' bgDark ' : ' bg-[#ECEEFE] '} min-h-screen isolate`}>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            {darkMode && (
                    <div>
                        <div aria-hidden="true" className=" fixed bottom-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-[-20rem]">
                            <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                                style={{
                                    clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                            />
                        </div>
                        <div aria-hidden="true" className=" fixed right-[0]  top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                            <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                                style={{
                                    clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                            />
                        </div>
                    </div>
                )}
            <div className="pt-24 pb-6">
                <div className={`${darkMode ? ' bg-gray-200 ': ' bg-white '} rounded-xl mx-auto lg:mx-16 xl:mx-auto max-w-2xl px-8 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8`}>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            My Orders
                        </h2>
                        <div className="-mt-4">
                            <div className="flow-root">
                                {
                                    orders && orders.length ? (
                                        <div>
                                            {
                                                orders?.map((order, index) => {
                                                    return (
                                                        <div key={index} className='divide-y divide-gray-400 mt-5'>
                                                            <div className='flex justify-between'>
                                                                <h2 className='text-xl font-semibold my-2'>
                                                                    Order #{index + 1}
                                                                </h2>
                                                                <h2 className='text-lg font-semibold my-2'>
                                                                    {/* Status:  */}
                                                                    <span className={`inline-block ${order.status=="Processing" ?"bg-yellow-500" :order.status=="Cancelled" ?"bg-red-500": "bg-green-500"} rounded-full p-[6px] mr-1`} />
                                                                    {order.status}
                                                                </h2>
                                                            </div>
                                                            <ul role="list" className="">
                                                                {order?.items?.map((item,index) => {
                                                                    return (
                                                                        <li key={index} className="flex pt-3">
                                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                <img
                                                                                    src={item.img}
                                                                                    alt={item.name}
                                                                                    className="h-full w-full object-cover object-center"
                                                                                />
                                                                            </div>
                                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                                <div>
                                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                        <h3>
                                                                                            {item.name}
                                                                                        </h3>
                                                                                        <p className="ml-4">
                                                                                            Rs. {item.price}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                                        <p className="mt-1 text-sm text-gray-500">
                                                                                            {item.color}
                                                                                        </p>
                                                                                        <p className="mt-1 text-sm text-gray-500">
                                                                                            Size: {item.size}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                                    <div className="text-gray-500">
                                                                                        Qty:{item.quantity}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            <div className="border-t border-gray-200 mt-6 pt-6 pb-2 ">
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <p>Subtotal</p>
                                                                    <p>Rs. {order.amount}</p>
                                                                </div>
                                                                <p className="mt-0.5 text-sm text-gray-500">
                                                                    Shipping and taxes calculated at checkout.
                                                                </p>
                                                                <p className='mt-4 -mb-1'>Shipping Address: </p>
                                                            </div>
                                                            <div className="flex justify-between gap-x-6 px-5 py-2 " style={{ border: "1px solid gray" }}>
                                                                <div className="flex min-w-0 gap-x-4">
                                                                    <div className="min-w-0 flex-auto">
                                                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                                                            {order.address.fullname}
                                                                        </p>
                                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                            {order.address.blockno}, {order.address.street}
                                                                        </p>
                                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                            {order.address.pinCode}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                                    <p className="text-sm leading-6 text-gray-900">
                                                                        Phone: {order.address.phone}
                                                                    </p>
                                                                    <p className="text-sm leading-6 text-gray-500">
                                                                        {order.address.city}, {order.address.state}
                                                                    </p>
                                                                    <p className="text-sm leading-6 text-gray-500">
                                                                        {order.address.country}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    ) : (
                                        <div>
                                            No Orders Yet
                                            <div className="mt-10  items-center justify-center ">
                                                <Link
                                                    to="/products"
                                                    className="rounded-md bg-coral-red px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-red"
                                                >
                                                    Explore Our Products
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrdersPage