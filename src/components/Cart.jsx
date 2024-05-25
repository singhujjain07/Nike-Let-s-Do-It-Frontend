import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom'


const Cart = ({ type }) => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0)
    const handleQuantityChange = async (id, quantity) => {
        try {
            const parsedQuantity = parseInt(quantity, 10);
            const newQuantity = isNaN(parsedQuantity) || parsedQuantity === 0 ? 1 : parsedQuantity;
            const res = await axios.put('/api/v1/auth/update-cart', { userId: auth?.user?._id, cartId: id, qty: newQuantity });
            if (res && res.data.success) {
                const newCart = res.data.cart
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    user: { ...prevAuth.user, cart: newCart },
                }));
                localStorage.setItem('auth', JSON.stringify({ ...auth, user: { ...auth.user, cart: newCart } }));
                // toast.success(res.data.message);
            } else {
                toast.error('Failed to update quantities');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }

    };
    const handleRemoveCart = async (cartId) => {
        try {
            const res = await axios.delete(`/api/v1/auth/remove-cart?userId=${auth?.user?._id}&cartId=${cartId}`);
            if (res && res.data.success) {
                const newCart = res.data.cart;
                // console.log(updatedUser)
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    user: {
                        ...prevAuth.user,
                        cart: newCart
                    },
                }));
                localStorage.setItem('auth', JSON.stringify({ ...auth, user: { ...auth.user, cart: newCart } }));
                toast.success(res.data.message);
            } else {
                toast.error('Failed to add to favorites');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
    useEffect(() => {
        setCart(auth?.user?.cart);
    }, [auth])
    const fetchProductDetails = async () => {
        try {
            const productDetails = await Promise.all(
                cart.map(item =>
                    axios.post(`/api/v1/products/get-single-product`, { productId: item.productId })
                )
            );
            if (productDetails.length) {
                let totalPrice = 0;
                let productsData = productDetails?.map(response => response.data.product);
                productsData.forEach((product, index) => {
                    totalPrice += product.price * cart[index].qty;
                });
                setProducts(productsData);
                setSubtotal(totalPrice);
            }
            else{
                setProducts([]);
                setSubtotal(0);
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };
    useEffect(() => {
        fetchProductDetails();
    }, [cart])

    return (
        <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Cart
            </h2>
            <div className="mt-8">
                <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart?.map((cartItem) => {
                            const product = products.find(p => p._id === cartItem.productId);
                            return (product &&
                                <li key={cartItem._id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={product.colors[cartItem.color].images[0]}
                                            alt={product._id}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    {product.model}
                                                </h3>
                                                <p className="ml-4">
                                                    Rs. {product.price}
                                                </p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {product.colors[cartItem.color].name}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Size: {cartItem.size}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="text-gray-500">
                                                <label htmlFor={`qty-${cartItem._id}`} className='mr-1'>Qty:</label>
                                                <input
                                                    type="number"
                                                    value={cartItem.qty}
                                                    id={`qty-${cartItem._id}`}
                                                    name="qty"
                                                    step="1"
                                                    min={1}
                                                    max={product.colors[cartItem.color].sizes[cartItem.size]}
                                                    onChange={(e) => handleQuantityChange(cartItem._id, parseInt(e.target.value))}
                                                    className='p-0 text-center border-gray-500 rounded-xl'
                                                />
                                            </div>

                                            <div className="flex">
                                                <button onClick={() => { handleRemoveCart(cartItem._id) }}
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>


            <div className="border-t border-gray-200 mt-6 py-6 ">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>Rs. {subtotal}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                    <Link
                        to={type === 0 ? "/checkout" : "/checkout"}
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                        {type === 0 ? "Checkout" : "Place Order/Pay Now"}
                    </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                        or{' '}
                        <Link
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            to={"/products"}
                        >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Cart