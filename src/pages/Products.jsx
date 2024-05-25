import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import FilterSection from '../components/FilterSection'
// import { products } from '../constants'
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom'
const Products = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/products/get-products')
            setProducts(data?.products);
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }
    // lifeCycle method
    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <div>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Our Hero Products
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product, index) => (
                            <div onClick={() => navigate(`/product-page/${product.slug}`)} key={index} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img src={product.colors[0].images[0]}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
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
                                            {product?.gender === "male" ? "Men's Shoes":product?.gender === "female"?"Women's Shoes":"Unisex Shoes"  }
                                        </p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">₹ {product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products