import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from "../components/Navbar";
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom'
import { DarkModeContext } from '../context/dark';
const FavoritesPage = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [darkMode, setDarkMode] = useContext(DarkModeContext);
    // get all products
    // lifeCycle method
    useEffect(() => {
        const getAllFavorites = async () => {
            setFavorites(auth?.user?.favorites)
        }
        if (auth?.user?.favorites) {
            getAllFavorites();
        }
    }, [auth])
    const addToFavorites = async (pid) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/api/v1/auth/add-to-favorites`, { userId: auth?.user?._id, itemId: pid });
            if (res && res.data.success) {
                const newFavorites = res.data.favorites;
                // console.log(updatedUser)
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    user: { ...prevAuth.user, favorites: newFavorites },
                }));
                localStorage.setItem('auth', JSON.stringify({ ...auth, user: { ...auth.user, favorites: newFavorites } }));
                toast.success(res.data.message);
            } else {
                toast.error('Failed to remove from favorites');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
    return (
        <div className={`${darkMode ? 'bgDark' : ' bg-white'} h-screen`}>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <div className='isolate'>
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
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className={`${darkMode?'text-coral-red' : 'text-gray-900 '} text-2xl font-bold tracking-tight `}>
                        Favourites
                    </h2>

                    {favorites.length ? (
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {favorites?.map((product, index) => (
                                <div key={index}>
                                    <div onClick={() => navigate(`/product-page/${product.slug}`)} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                                            <img src={product.colors[0].images[0]}
                                                alt={product.imageAlt}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75 lg:h-full lg:w-full"
                                            />
                                        </div>

                                        <div className="mt-4 flex justify-between">
                                            <div>
                                                <h3 className={`text-sm ${darkMode ? ' text-gray-300 ' : ' text-gray-700 '}`}>
                                                    <a href={product.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {product.model}
                                                    </a>
                                                </h3>
                                                <p className={`mt-1 text-sm ${darkMode ? ' text-gray-400 ' : ' text-gray-500 '}`}>
                                                    {product?.gender === "male" ? "Men's Shoes" : product?.gender === "female" ? "Women's Shoes" : "Unisex Shoes"}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">₹ {product.price}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <button onClick={() => navigate(`/product-page/${product.slug}`)} className={`flex justify-center items-center gap-2 px-4 py-2 border font-montserrat text-xs leading-none ${darkMode ? 'bg-coral-red border-coral-red' : 'bg-black border-black'}   text-white  rounded-full w-5/12 `}>
                                            Add to Bag
                                        </button>
                                        <button onClick={() => { addToFavorites(product._id) }} className={`flex gap-2 px-4 py-2 justify-center items-center  border border-gray-500 font-montserrat
                                         ${darkMode ? 'text-white' : 'text-black'} text-xs leading-none rounded-full w-5/12  `}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (<div className='text-lg mt-6'>Add your favorite items to get started 😉</div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default FavoritesPage