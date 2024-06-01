import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import { useAuth } from '../context/auth';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyOrdersPage = () => {
    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {
        const res = await axios.post('/api/v1/order/user/orders', { userId: auth?.user?._id });
        if (res?.data?.success) {
            console.log(res?.data?.orders)
            setOrders(res?.data?.orders);
        }
    }
    useEffect(() => {
        fetchOrders();
    }, [auth?.user])
    return (
        <div className='bg-[#ECEEFE] min-h-screen'>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <div className="pt-24 pb-6">
                <div className="bg-white mx-auto lg:mx-16 xl:mx-auto max-w-2xl px-8 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
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
                                                        <div className='divide-y divide-gray-400 mt-5'>
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
                                                                {order?.items?.map((item) => {
                                                                    return (
                                                                        <li key={item.name} className="flex pt-3">
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