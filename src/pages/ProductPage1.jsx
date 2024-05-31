import React, { useEffect, useState, useRef } from 'react'
import { AirJordan1Img, jordanRed } from '../constants'
import Button from '../components/Button'
import { heart, heart1 } from '../assets/icons'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../context/auth'
import { toast } from 'react-toastify'
import { down } from '../assets/icons'
import { useInView } from 'react-intersection-observer'; // Import useInView hook


const ProductPage = () => {
    const params = useParams()
    const [product, setProduct] = useState({});
    const [isPresent, setIsPresent] = useState(false);
    const [auth, setAuth] = useAuth();
    // initial p details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])
    useEffect(() => {
        if (auth?.user?.favorites?.some(favorite => favorite._id === product?._id)) {
            setIsPresent(true);
        }
    }, [auth?.user?.favorites?.some(favorite => favorite._id === product?._id)]);
    // get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/products/get-product/${params.slug}`)
            setProduct(data?.product)
            setShoeimg(data?.product?.colors[0]?.images)
            setShoeSizes(data?.product?.colors[0]?.sizes)
            setClr(data?.product?.colors[0]?.name);
            // if (auth?.user?.favorites.includes(data?.product?._id)) {
            //     setIsPresent(true);
            // }
            // if(data?.product){
            //     setShoeClr(data?.product.colors[0].images[0])
            // }
        } catch (error) {
            console.log(error)
        }
    }
    const addToFavorites = async () => {
        try {
            const res = await axios.post(`/api/v1/auth/add-to-favorites`, { userId: auth?.user?._id, itemId: product?._id });
            if (res && res.data.success) {
                const newFavorites = res.data.favorites;
                // console.log(updatedUser)
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    user: {
                        ...prevAuth.user,
                        favorites: newFavorites
                    },
                }));
                localStorage.setItem('auth', JSON.stringify({ ...auth, user: { ...auth.user, favorites: newFavorites } }));
                toast.success(res.data.message);
                setIsPresent(!isPresent)
            } else {
                toast.error('Failed to add to favorites');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
    const addToCart = async () => {
        try {
            var sz;
            if (selectSize.length) {
                sz = selectSize[0];
                if (auth?.user?.cart?.find(item => item.productId === product?._id && item.color == shoeClr && item.size === sz)) {
                    toast.info("Item already in cart")
                    return;
                }
                const res = await axios.post(`/api/v1/auth/add-to-cart`, { userId: auth?.user?._id, productId: product?._id, img: product?.colors[shoeClr].images[0], qty: 1, color: shoeClr, size: sz });
                if (res && res.data.success) {
                    const newCart = res.data.cart;
                    setAuth((prevAuth) => ({
                        ...prevAuth,
                        user: { ...prevAuth.user, cart: newCart },
                    }));
                    localStorage.setItem('auth', JSON.stringify({ ...auth, user: { ...auth.user, cart: newCart } }));
                    toast.success(res.data.message);
                } else {
                    toast.error('Failed to add to cart');
                }
            }
            else {
                toast.warn('Select a size')
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
    const [shoeClr, setShoeClr] = useState(0);
    const [shoeImg, setShoeimg] = useState();
    const [shoeInd, setShoeInd] = useState(0);
    const [shoeSizes, setShoeSizes] = useState();
    const [selectSize, setSelectSize] = useState([]);
    const [clr, setClr] = useState("");
    const handleSize = (key, val) => {
        if (val != 0) setSelectSize([key, val]);
        else setSelectSize([]);
    }
    const [open, setOpen] = useState([0, 0, 0, 0]);
    const handleOpen = (index) => {
        setOpen(prevState => {
            const newState = [...prevState]; // Create a copy of the state array
            newState[index] = !newState[index]; // Toggle the value at the specified index
            return newState; // Return the updated state
        });
    }

    const [isFixed, setIsFixed] = useState(true);
    const observedDiv = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                root: null, // Use the viewport as the container
                threshold: 0.001, // Trigger when 10% of the element is in the viewport
            }
        );

        if (observedDiv.current) {
            observer.observe(observedDiv.current);
        }
        return () => {
            if (observedDiv.current) {
                observer.unobserve(observedDiv.current);
            }
        };
    }, []);


    return (
        <main className=" flex flex-col dark:bg-[#070F2B]">
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <section className=" padding-pro">
                <section className=" w-full flex lg:flex-col flex-col justify-center max-container">
                    <div className={`sticky top-24   lg:w-5/5 flex lg:flex-row flex-col items-start w-full xl:gap-8 gap-4`}>
                        <div className=' h-[85vh] overflow-y-scroll prod_scroll lg:block hidden'>
                            {
                                shoeImg?.map((imgUrl, index) => (
                                    <div key={index} onMouseOver={() => setShoeInd(index)} className={`${index == shoeInd && "border-black"} border-[2px] overflow-hidden flex bg-center bg-cover justify-center items-center rounded-md  hover:border-black cursor-pointer max-sm:flex-1 w-[70px] h-[70px] max-sm:p-4 mb-1`}>
                                        <img className='' src={imgUrl} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className='w-full flex flex-col lg:hidden '>
                            <h3 className="font-palanquin  text-3xl font-bold">
                                {product?.model}
                            </h3>
                            <h3 className="font-palanquin text-xl font-medium">
                                {product?.gender === "male" ? "Men's Shoes" : product?.gender === "female" ? "Women's Shoes" : "Unisex Shoes"}
                            </h3>
                            <h3 className="font-palanquin text-xl font-medium">
                                MRP : ₹ {product?.price}
                            </h3>
                            <p className='info-text'>incl. of taxes</p>
                            <p className='info-text'>(Also includes all applicable duties)</p>
                        </div>
                        <div className='overflow-hidden flex bg-center bg-cover justify-center items-center rounded-xl hover:border-black '>
                            {shoeImg && <img className='xl:h-[600px] xl:w-[480px] lg:h-[500px] lg:w-[430px]' src={shoeImg[shoeInd]} alt="main-shoe" />}
                        </div>
                    </div>
                    <div className="mt-0 lg:pl-3 lg:ml-auto lg:w-2/5  flex-1 flex flex-col pb-40 sm:py-4 bg-cover bg-center rounded-b-3xl gap-8 px-5">
                        <div className='w-full lg:flex flex-col hidden'>
                            <h3 className="font-palanquin  text-3xl font-bold">
                                {product?.model}
                            </h3>
                            <h3 className="font-palanquin text-xl font-medium">
                                {product?.gender === "male" ? "Men's Shoes" : product?.gender === "female" ? "Women's Shoes" : "Unisex Shoes"}
                            </h3>
                            <h3 className="font-palanquin text-xl font-medium">
                                MRP : ₹ {product?.price}
                            </h3>
                            <p className='info-text'>incl. of taxes</p>
                            <p className='info-text'>(Also includes all applicable duties)</p>
                        </div>
                        <div className="grid grid-cols-5 gap-1 max-sm:mt-4  2xl:w-4/5">
                            {
                                product?.colors?.map((color, index) => (
                                    <div key={index} onClick={() => { setShoeimg(color.images); setClr(color.name); setShoeSizes(color.sizes); setShoeClr(index); if (shoeClr != index) { handleSize(-1, 0) } }} className={`border-[2px] overflow-hidden flex bg-center bg-cover justify-center items-center rounded-md ${index == shoeClr && "border-black"} hover:border-black cursor-pointer max-sm:flex-1 lg:w-[65px] lg:h-[65px] xl:w-[70px] xl:h-[70px] `}>
                                        <img className='' src={color.images[0]} alt={color.name} />
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <h3 className="font-palanquin text-start text-xl font-medium">
                                Select Size
                            </h3>
                            <div className="grid lg:grid-cols-3 md:grid-cols-5 sm:grid-cols-4 grid-cols-6 max-[600px]:grid-cols-4  gap-1 max-sm:mt-4  2xl:w-4/5">
                                {
                                    shoeSizes && Object.entries(shoeSizes)?.map(([key, value]) => (
                                        <div key={key} onClick={() => { handleSize(key, value) }} className={`border-[1px] ${key == selectSize[0] && "border-black"} flex  justify-center items-center rounded-md ${value > "0" ? "hover:border-black cursor-pointer" : "text-gray-300 bg-gray-50"}  max-sm:flex-1 max-sm:w-[80px] max-[400px]:h-[30px] max-[400px]:w-[40px] max-[400px]:text-xs  h-[50px] w-[115px] `}>
                                            {key}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 justify-center'>
                            {/* <Button label="Add to Bag" backgroundColor={"bg-black"} borderColor={"border-black"} textColor={"text-white"} fullWidth /> */}
                            <button onClick={() => { addToCart() }} className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none bg-black text-white border-black rounded-full w-96 max-lg:w-full `}>
                                Add to Bag
                            </button>
                            {isPresent ? (
                                <button onClick={() => { addToFavorites() }} className={`flex justify-center items-center gap-2 px-7 py-4 border border-gray-500 font-montserrat 
                                bg-my-pink text-white text-lg leading-none rounded-full w-96 max-lg:w-full  `}>
                                    Favourite
                                    <img src={heart1} alt="arrow right icon" className="ml-2 w-4 h-4" />
                                </button>
                            ) : (
                                <button onClick={() => { addToFavorites() }} className={`flex justify-center items-center gap-2 px-7 py-4 border border-gray-500 font-montserrat
                                text-lg leading-none rounded-full w-96 max-lg:w-full  `}>
                                    Favourite
                                    <img src={heart} alt="arrow right icon" className="ml-2 w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                            <label>
                                <input className="peer/showLabel absolute scale-0" type="checkbox" />
                                <span onClick={() => { handleOpen(3) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[3] && 'max-h-60'} cursor-pointer`}>
                                    <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                        Product Description
                                        <img src={down} alt="" className={`transition-all duration-500 ${open[3] && ' rotate-180'}`} width={14} />
                                    </h1>
                                    <div className='pl-2' style={{ wordSpacing: "5px" }}>
                                        {product.description}
                                    </div>
                                    <div className='my-4'>
                                        <ul className='list-disc pl-7'>
                                            <li>Color Shown : <span className='font-normal'>{clr}</span></li>
                                        </ul>
                                    </div>
                                </span>
                            </label>
                        </div>
                        {/* <div className='pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full' style={{ wordSpacing: "5px" }}>
                            {product.description}
                        </div>
                        <div className='pl-2 font-palanquin font-medium text-lg w-96 max-lg:w-full'>
                            <ul className='list-disc pl-7'>
                                <li>Color Shown : <span className='font-normal'>{clr}</span></li>
                            </ul>
                        </div> */}
                        <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                            <label>
                                <input className="peer/showLabel absolute scale-0" type="checkbox" />
                                <span onClick={() => { handleOpen(0) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[0] && 'max-h-60'} cursor-pointer`}>
                                    <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                        Delivery &amp; Returns
                                        <img src={down} alt="" className={`transition-all duration-1000 ${open[0] && ' rotate-180'}`} width={14} />
                                    </h1>
                                    <p className="mb-2">
                                        <ul className='list-disc pl-7'>
                                            <li className='pb-2'>
                                                All purchases are subject to delivery fees.
                                            </li>
                                            <li className='pb-2'>
                                                Standard delivery 4–9 business days
                                            </li>
                                            <li className='pb-2'>
                                                Orders are processed and delivered Monday–Friday (excluding public holidays)
                                            </li>
                                            <li className='pb-2'>
                                                Nike Members enjoy free returns.
                                            </li>
                                        </ul>
                                    </p>
                                </span>
                            </label>
                        </div>
                        <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                            <label>
                                <input className="peer/showLabel absolute scale-0" type="checkbox" />
                                <span onClick={() => { handleOpen(1) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[1] && 'max-h-60'} cursor-pointer`}>
                                    <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                        Product &amp; Information
                                        <img src={down} alt="" className={`transition-all duration-1000 ${open[1] && ' rotate-180'}`} width={14} />
                                    </h1>
                                    <p className="mb-2">
                                        Declaration of Importer: Direct import by the individual customer
                                        <br /> <br />
                                        Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440
                                        Net Quantity: 1 Pair
                                    </p>
                                </span>
                            </label>
                        </div>
                        <div ref={observedDiv} className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                            <label className="block">
                                <span onClick={() => { handleOpen(2) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[2] && 'max-h-60'} cursor-pointer`}>
                                    <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                        Reviews
                                        <img src={down} alt="" className={`transition-all duration-1000 ${open[2] && ' rotate-180'}`} width={14} />
                                    </h1>
                                    <p className="mb-2">
                                        ahhahahhh <br /><br />
                                        hhahahhh <br /><br />
                                        hhahahhh <br /><br />
                                        ahhahahhh <br /><br />
                                    </p>
                                </span>
                            </label>
                        </div>
                    </div>
                </section>
            </section>
            <div>
                <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                    <label>
                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                        <span onClick={() => { handleOpen(0) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[0] && 'max-h-60'} cursor-pointer`}>
                            <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                Delivery &amp; Returns
                                <img src={down} alt="" className={`transition-all duration-1000 ${open[0] && ' rotate-180'}`} width={14} />
                            </h1>
                            <p className="mb-2">
                                <ul className='list-disc pl-7'>
                                    <li className='pb-2'>
                                        All purchases are subject to delivery fees.
                                    </li>
                                    <li className='pb-2'>
                                        Standard delivery 4–9 business days
                                    </li>
                                    <li className='pb-2'>
                                        Orders are processed and delivered Monday–Friday (excluding public holidays)
                                    </li>
                                    <li className='pb-2'>
                                        Nike Members enjoy free returns.
                                    </li>
                                </ul>
                            </p>
                        </span>
                    </label>
                </div>
                <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                    <label>
                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                        <span onClick={() => { handleOpen(1) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[1] && 'max-h-60'} cursor-pointer`}>
                            <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                Product &amp; Information
                                <img src={down} alt="" className={`transition-all duration-1000 ${open[1] && ' rotate-180'}`} width={14} />
                            </h1>
                            <p className="mb-2">
                                Declaration of Importer: Direct import by the individual customer
                                <br /> <br />
                                Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440
                                Net Quantity: 1 Pair
                            </p>
                        </span>
                    </label>
                </div>
                <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                    <label>
                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                        <span onClick={() => { handleOpen(0) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[0] && 'max-h-60'} cursor-pointer`}>
                            <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                Delivery &amp; Returns
                                <img src={down} alt="" className={`transition-all duration-1000 ${open[0] && ' rotate-180'}`} width={14} />
                            </h1>
                            <p className="mb-2">
                                <ul className='list-disc pl-7'>
                                    <li className='pb-2'>
                                        All purchases are subject to delivery fees.
                                    </li>
                                    <li className='pb-2'>
                                        Standard delivery 4–9 business days
                                    </li>
                                    <li className='pb-2'>
                                        Orders are processed and delivered Monday–Friday (excluding public holidays)
                                    </li>
                                    <li className='pb-2'>
                                        Nike Members enjoy free returns.
                                    </li>
                                </ul>
                            </p>
                        </span>
                    </label>
                </div>
                <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                    <label>
                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                        <span onClick={() => { handleOpen(1) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[1] && 'max-h-60'} cursor-pointer`}>
                            <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                Product &amp; Information
                                <img src={down} alt="" className={`transition-all duration-1000 ${open[1] && ' rotate-180'}`} width={14} />
                            </h1>
                            <p className="mb-2">
                                Declaration of Importer: Direct import by the individual customer
                                <br /> <br />
                                Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440
                                Net Quantity: 1 Pair
                            </p>
                        </span>
                    </label>
                </div>
                <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                    <label>
                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                        <span onClick={() => { handleOpen(0) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[0] && 'max-h-60'} cursor-pointer`}>
                            <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                Delivery &amp; Returns
                                <img src={down} alt="" className={`transition-all duration-1000 ${open[0] && ' rotate-180'}`} width={14} />
                            </h1>
                            <p className="mb-2">
                                <ul className='list-disc pl-7'>
                                    <li className='pb-2'>
                                        All purchases are subject to delivery fees.
                                    </li>
                                    <li className='pb-2'>
                                        Standard delivery 4–9 business days
                                    </li>
                                    <li className='pb-2'>
                                        Orders are processed and delivered Monday–Friday (excluding public holidays)
                                    </li>
                                    <li className='pb-2'>
                                        Nike Members enjoy free returns.
                                    </li>
                                </ul>
                            </p>
                        </span>
                    </label>
                </div>
                <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                    <label>
                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                        <span onClick={() => { handleOpen(1) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[1] && 'max-h-60'} cursor-pointer`}>
                            <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                Product &amp; Information
                                <img src={down} alt="" className={`transition-all duration-1000 ${open[1] && ' rotate-180'}`} width={14} />
                            </h1>
                            <p className="mb-2">
                                Declaration of Importer: Direct import by the individual customer
                                <br /> <br />
                                Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440
                                Net Quantity: 1 Pair
                            </p>
                        </span>
                    </label>
                </div>
                <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                    <label>
                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                        <span onClick={() => { handleOpen(0) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[0] && 'max-h-60'} cursor-pointer`}>
                            <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                Delivery &amp; Returns
                                <img src={down} alt="" className={`transition-all duration-1000 ${open[0] && ' rotate-180'}`} width={14} />
                            </h1>
                            <p className="mb-2">
                                <ul className='list-disc pl-7'>
                                    <li className='pb-2'>
                                        All purchases are subject to delivery fees.
                                    </li>
                                    <li className='pb-2'>
                                        Standard delivery 4–9 business days
                                    </li>
                                    <li className='pb-2'>
                                        Orders are processed and delivered Monday–Friday (excluding public holidays)
                                    </li>
                                    <li className='pb-2'>
                                        Nike Members enjoy free returns.
                                    </li>
                                </ul>
                            </p>
                        </span>
                    </label>
                </div>
                <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                    <label>
                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                        <span onClick={() => { handleOpen(1) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[1] && 'max-h-60'} cursor-pointer`}>
                            <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                Product &amp; Information
                                <img src={down} alt="" className={`transition-all duration-1000 ${open[1] && ' rotate-180'}`} width={14} />
                            </h1>
                            <p className="mb-2">
                                Declaration of Importer: Direct import by the individual customer
                                <br /> <br />
                                Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440
                                Net Quantity: 1 Pair
                            </p>
                        </span>
                    </label>
                </div>
                <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                    <label>
                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                        <span onClick={() => { handleOpen(0) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[0] && 'max-h-60'} cursor-pointer`}>
                            <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                Delivery &amp; Returns
                                <img src={down} alt="" className={`transition-all duration-1000 ${open[0] && ' rotate-180'}`} width={14} />
                            </h1>
                            <p className="mb-2">
                                <ul className='list-disc pl-7'>
                                    <li className='pb-2'>
                                        All purchases are subject to delivery fees.
                                    </li>
                                    <li className='pb-2'>
                                        Standard delivery 4–9 business days
                                    </li>
                                    <li className='pb-2'>
                                        Orders are processed and delivered Monday–Friday (excluding public holidays)
                                    </li>
                                    <li className='pb-2'>
                                        Nike Members enjoy free returns.
                                    </li>
                                </ul>
                            </p>
                        </span>
                    </label>
                </div>
                <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                    <label>
                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                        <span onClick={() => { handleOpen(1) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[1] && 'max-h-60'} cursor-pointer`}>
                            <h1 className="flex text-2xl h-14 justify-between items-center font-semibold">
                                Product &amp; Information
                                <img src={down} alt="" className={`transition-all duration-1000 ${open[1] && ' rotate-180'}`} width={14} />
                            </h1>
                            <p className="mb-2">
                                Declaration of Importer: Direct import by the individual customer
                                <br /> <br />
                                Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440
                                Net Quantity: 1 Pair
                            </p>
                        </span>
                    </label>
                </div>
            </div>
        </main>
    )
}

export default ProductPage