import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from "../components/Navbar";
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom'
const FavoritesPage = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [favorites, setFavorites] = useState([]);
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
            const res = await axios.post(`/api/v1/auth/add-to-favorites`, { userId: auth?.user?._id, itemId: pid });
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
        <div>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Favorites
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
                                                <h3 className="text-sm text-gray-700">
                                                    <a href={product.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {product.model}
                                                    </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {product?.gender === "male" ? "Men's Shoes" : product?.gender === "female" ? "Women's Shoes" : "Unisex Shoes"}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">₹ {product.price}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <button className={`flex justify-center items-center gap-2 px-4 py-2 border font-montserrat text-xs leading-none bg-black text-white border-black rounded-full w-5/12 `}>
                                            Add to Bag
                                        </button>
                                        <button onClick={() => { addToFavorites(product._id) }} className={`flex gap-2 px-4 py-2 justify-center items-center  border border-gray-500 font-montserrat
                                    text-xs leading-none rounded-full w-5/12  `}>
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