import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify'
import axios from 'axios';
import Cart from "../components/Cart";
import { DarkModeContext } from '../context/dark';


const CheckoutPage = () => {
    const [auth, setAuth] = useAuth();
    const [fullname, setFullname] = useState("");
    const [country, setCountry] = useState("India");
    const [blockno, setblockno] = useState("");
    const [phone, setPhone] = useState("")
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [addIndex, setAddIndex] = useState(0);
    const [paymentMode, setPaymentMode] = useState(0);
    const [darkMode,setDarkMode] = useContext(DarkModeContext);
    const resetForm = () => {
        setFullname("");
        setCountry("India");
        setblockno("");
        setPhone("")
        setStreet("");
        setCity("");
        setState("");
        setPinCode("");
        document.getElementById("address-form").reset();
    }
    const addAddress = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/api/v1/auth/add-address`, { userId: auth?.user?._id, fullname, country, blockno, phone, street, city, state, pinCode });
            const newAddresses = res.data.addresses;
            setAddresses(newAddresses)
            setAuth((prevAuth) => ({
                ...prevAuth,
                user: {
                    ...prevAuth.user,
                    addresses: newAddresses
                }
            }));
            localStorage.setItem('auth', JSON.stringify({ ...auth, user: { ...auth.user, addresses: newAddresses } }));
            toast.success(res.data.message);
            resetForm();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
    useEffect(() => {
        const getAllAddresses = async () => {
            setAddresses(auth?.user?.addresses)
        }
        getAllAddresses();
    }, [auth?.user])



    return (
        <div className={'bg-gray-300'}>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <div className="mx-auto max-w-2xl  py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
                    <div className='lg:col-span-3'>
                        <form onSubmit={addAddress} id="address-form" className='bg-white px-6 py-6 sm:my-0 my-4'>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl  font-semibold leading-7 text-gray-900">
                                        Personal Information
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Fullname
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="full-name"
                                                    value={fullname}
                                                    onChange={(e) => { setFullname(e.target.value) }}
                                                    id="full-name"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Country
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="country"
                                                    name="country"
                                                    value={country}
                                                    onChange={(e) => { setCountry(e.target.value) }}
                                                    autoComplete="country-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option value="India">India</option>
                                                    <option value="United States">United States</option>
                                                    <option value="Canada">Canada</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="blockno" className="block text-sm font-medium leading-6 text-gray-900">
                                                Flat, Housen no., Building, Company, Apartment
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="blockno"
                                                    name="blockno"
                                                    value={blockno}
                                                    onChange={(e) => { setblockno(e.target.value) }}
                                                    type="text"
                                                    autoComplete="blockno"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="blockno" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone No.
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    value={phone}
                                                    onChange={(e) => { setPhone(e.target.value) }}
                                                    type="text"
                                                    autoComplete="phone"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="street-address"
                                                    id="street-address"
                                                    value={street}
                                                    onChange={(e) => { setStreet(e.target.value) }}
                                                    autoComplete="street-address"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                Town/City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    value={city}
                                                    onChange={(e) => { setCity(e.target.value) }}
                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="state"
                                                    name="state"
                                                    id="state"
                                                    value={state}
                                                    onChange={(e) => { setState(e.target.value) }}
                                                    autoComplete="address-level1"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="pin-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="pin-code"
                                                    id="pin-code"
                                                    value={pinCode}
                                                    onChange={(e) => { setPinCode(e.target.value) }}
                                                    autoComplete="pin-code"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button onClick={() => { resetForm() }} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Address
                                    </button>
                                </div>
                                <div className="border-b border-gray-900/10 pb-12">
                                    {addresses && addresses.length ? (
                                        <div>
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                                Address
                                            </h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Choose from Existing addresses:
                                            </p>
                                            <ul role="list" className="">
                                                {addresses?.map((address, index) => (
                                                    <li key={address._id} className="flex justify-between gap-x-6 px-5 py-5 mt-1 " style={{ border: "1px solid gray" }}>
                                                        <div className="flex min-w-0 gap-x-4">
                                                            <input
                                                                name="address"
                                                                type="radio"
                                                                value={index}
                                                                checked={index == addIndex}
                                                                onChange={() => { setAddIndex(index) }}
                                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                            <div className="min-w-0 flex-auto">
                                                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                                                    {address.fullname}
                                                                </p>
                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                    {address.blockno}, {address.street}
                                                                </p>
                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                    {address.pinCode}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                            <p className="text-sm leading-6 text-gray-900">
                                                                Phone: {address.phone}
                                                            </p>
                                                            <p className="text-sm leading-6 text-gray-500">
                                                                {address.city}, {address.state}
                                                            </p>
                                                            <p className="text-sm leading-6 text-gray-500">
                                                                {address.country}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )
                                    }

                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                                                Payment Methods
                                            </legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Choose One:
                                            </p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        name="payments"
                                                        type="radio"
                                                        value={0}
                                                        checked={paymentMode == 0}
                                                        onChange={() => { setPaymentMode(0) }}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="card"
                                                        name="payments"
                                                        type="radio"
                                                        value={1}
                                                        checked={paymentMode == 1}
                                                        onChange={() => { setPaymentMode(1) }}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div className='lg:col-span-2'>
                        {/* <div className=""> */}
                        <div className=" bg-white mx-auto max-w-2xl py-4 px-6 sm:px-6 lg:px-6 sm:py-6 lg:max-w-7xl ">
                            <Cart mode={paymentMode} type={1} address={addresses && addresses.length ? addresses[addIndex] : null} />
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage