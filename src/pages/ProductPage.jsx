import React, { useEffect, useState, useRef, useContext } from 'react'
import { AirJordan1Img, jordanRed } from '../constants'
import Button from '../components/Button'
import { heart, heart1 } from '../assets/icons'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../context/auth'
import { toast } from 'react-toastify'
import { down, down1 } from '../assets/icons'
import { useInView } from 'react-intersection-observer'; // Import useInView hook
import ShoeSection from './sections/ShoeSection'
import AirJordan1 from './shoes/AirJordan1'
import AirForce1 from './shoes/AirForce1'
import AirMax1 from './shoes/AirMax1'
import AirMax90 from './shoes/AirMax90'
import DunkLowRetro from './shoes/DunkLowRetro'
import AirMoreUptempo from './shoes/AirMoreUptempo'
import NikeDunkHigh from './shoes/NikeDunkHigh'
import Vomero17 from './shoes/Vomero17'
import { DarkModeContext } from '../context/dark'


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
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/api/v1/products/get-product/${params.slug}`)
            setProduct(data?.product)
            setShoeimg(data?.product?.colors[0]?.images)
            setShoeSizes(data?.product?.colors[0]?.sizes)
            setClr(data?.product?.colors[0]?.name);
        } catch (error) {
            console.log(error)
        }
    }
    const addToFavorites = async () => {
        try {
            if (!auth?.user) {
                toast.warn('Login first!');
                return;
            }
            const res = await axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/api/v1/auth/add-to-favorites`, { userId: auth?.user?._id, itemId: product?._id });
            if (res && res.data.success) {
                const newFavorites = res.data.favorites;
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
            if (!auth?.user) {
                toast.warn('Login first!');
                return;
            }
            var sz;
            if (selectSize.length) {
                sz = selectSize[0];
                if (auth?.user?.cart?.find(item => item.productId === product?._id && item.color == shoeClr && item.size === sz)) {
                    toast.info("Item already in cart")
                    return;
                }
                const res = await axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/api/v1/auth/add-to-cart`, { userId: auth?.user?._id, productId: product?._id, img: product?.colors[shoeClr].images[0], qty: 1, color: shoeClr, size: sz });
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
    const [darkMode, setDarkMode] = useContext(DarkModeContext);

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

    const [showOverlay, setShowOverlay] = useState(true);
    const { ref, inView } = useInView({ threshold: 0.5 }); // Initialize the inView hook

    useEffect(() => {
        let timer;
        if (inView) {
            timer = setTimeout(() => {
                setShowOverlay(false);
            }, 8000); // Hide overlay after 5 seconds
        }
        return () => clearTimeout(timer);
    }, [inView]);

    const threeDModel = (id) => {
        switch (id) {
            case 1:
                return <AirJordan1 />
            case 2:
                return <AirMax1 />
            case 3:
                return <AirForce1 />
            case 4:
                return <AirMax90 />
            case 5:
                return <DunkLowRetro />
            case 6:
                return <Vomero17 />
            case 7:
                return <AirMoreUptempo />
            case 8:
                return <NikeDunkHigh />
        }
    }

    return (
        <main className={`${darkMode ? 'bgDark' : ''} flex flex-col isolate`}>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            {
                darkMode && (
                    <div
                        className=" fixed right-[0]  top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                )
            }
            <section className="xl:px-32 px-8 py-12 max-lg:mt-8">
                <section className=" w-full flex lg:flex-col flex-col justify-center max-container">
                    <div className={`lg:sticky lg:top-24   lg:w-3/5 flex lg:flex-row flex-col items-start w-full xl:gap-8 gap-4`}>
                        <div className=' xl:h-[600px] lg:h-[500px] overflow-y-scroll prod_scroll lg:block hidden'>
                            {
                                shoeImg?.map((imgUrl, index) => (
                                    <div key={index} onMouseOver={() => setShoeInd(index)} className={`${index == shoeInd && `${darkMode ? 'border-coral-red border-[2px] hover:border-coral-red' : 'border-black border-[2px] hover:border-black'}`}  overflow-hidden flex bg-center bg-cover justify-center items-center rounded-md   cursor-pointer max-sm:flex-1 w-[70px] h-[70px] max-sm:p-4 mb-1`}>
                                        <img className='' src={imgUrl} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className='w-full flex flex-col lg:hidden '>
                            <h3 className={`${darkMode ? 'text-coral-red' : 'text-black '} font-palanquin  text-3xl font-bold`}>
                                {product?.model}
                            </h3>
                            <h3 className={`${darkMode ? 'text-gray-300' : ''} font-palanquin text-xl font-medium`}>
                                {product?.gender === "male" ? "Men's Shoes" : product?.gender === "female" ? "Women's Shoes" : "Unisex Shoes"}
                            </h3>
                            <h3 className={`${darkMode ? 'text-gray-300' : ''} font-palanquin text-xl font-medium`}>
                                MRP : ₹ {product?.price}
                            </h3>
                            <div className={`${darkMode ? 'text-gray-400 ' : ' '}`}>
                                <p className='info-text'>incl. of taxes</p>
                                <p className='info-text'>(Also includes all applicable duties)</p>
                            </div>
                        </div>
                        <div className='overflow-hidden flex bg-center bg-cover justify-center items-center rounded-xl hover:border-black '>
                            {shoeImg && <img className='xl:h-[600px] xl:w-[480px] lg:h-[500px] lg:w-[430px]' src={shoeImg[shoeInd]} alt="main-shoe" />}
                        </div>
                    </div>
                    <div className=" xl:-mt-[530px] lg:-mt-[480px]   lg:pl-3 lg:ml-auto lg:w-2/5  flex-1 flex flex-col pb-40 sm:py-4 bg-cover bg-center rounded-b-3xl gap-8 px-5">
                        <div className='w-full lg:flex flex-col hidden'>
                            <h3 className={`${darkMode ? 'text-coral-red' : 'text-black '} font-palanquin  text-3xl font-bold`}>
                                {product?.model}
                            </h3>
                            <h3 className={`${darkMode ? 'text-gray-300' : ''}  font-palanquin text-xl font-medium`}>
                                {product?.gender === "male" ? "Men's Shoes" : product?.gender === "female" ? "Women's Shoes" : "Unisex Shoes"}
                            </h3>
                            <h3 className={`${darkMode ? 'text-gray-300' : ''}  font-palanquin text-xl font-medium`}>
                                MRP : ₹ {product?.price}
                            </h3>
                            <div className={`${darkMode ? 'text-gray-400 ' : ' '}`}>
                                <p className='info-text'>incl. of taxes</p>
                                <p className='info-text'>(Also includes all applicable duties)</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-1 max-sm:mt-4  2xl:w-4/5">
                            {
                                product?.colors?.map((color, index) => (
                                    <div key={index} onClick={() => { setShoeimg(color.images); setClr(color.name); setShoeSizes(color.sizes); setShoeClr(index); if (shoeClr != index) { handleSize(-1, 0) } }}
                                        className={`border-[2px] overflow-hidden flex bg-center bg-cover justify-center items-center rounded-md ${index == shoeClr && `${darkMode ? 'border-coral-red ' : "border-black "}`} ${darkMode ? ' hover:border-coral-red ' : ' hover:border-black '} cursor-pointer max-sm:flex-1 lg:w-[65px] lg:h-[65px] xl:w-[70px] xl:h-[70px] `}>
                                        <img className='' src={color.images[0]} alt={color.name} />
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <h3 className={`${darkMode ? ' text-gray-400 ' : ' '}  font-palanquin text-start text-xl font-medium mb-2`}>
                                Select Size :
                            </h3>
                            <div className="grid lg:grid-cols-3 md:grid-cols-5 sm:grid-cols-4 grid-cols-6 max-[600px]:grid-cols-4  gap-1 max-sm:mt-4  2xl:w-4/5">
                                {
                                    shoeSizes && Object.entries(shoeSizes)?.map(([key, value]) => (
                                        <div key={key} onClick={() => { handleSize(key, value) }} className={`border-[1px] ${key == selectSize[0] && `${darkMode ? ' border-coral-red ' : ' border-black '} `} flex  justify-center items-center rounded-md ${value > "0" ? `${darkMode ? ' hover:border-coral-red  text-gray-600 bg-gray-300 border-[2px]' : ' hover:border-black  '} cursor-pointer` : ` ${darkMode ? ' text-gray-400 bg-gray-600 border-none' : ' text-gray-300 bg-gray-50 '}`}  max-sm:flex-1 max-sm:w-[80px] max-[400px]:h-[30px] max-[400px]:w-[40px] max-[400px]:text-xs  h-[50px] w-[115px] `}>
                                            {key}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 justify-center'>
                            {/* <Button label="Add to Bag" backgroundColor={"bg-black"} borderColor={"border-black"} textColor={"text-white"} fullWidth /> */}
                            <button onClick={() => { addToCart() }} className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none ${darkMode ? ' bg-coral-red text-black border-coral-red ' : ' bg-black text-white border-black '} rounded-full w-96 max-lg:w-full `}>
                                Add to Bag
                            </button>
                            {isPresent ? (
                                <button onClick={() => { addToFavorites() }} className={`flex justify-center items-center gap-2 px-7 py-4 border border-gray-500 font-montserrat 
                                bg-my-pink text-white text-lg leading-none rounded-full w-96 max-lg:w-full  `}>
                                    Favourite
                                    <img src={heart1} alt="arrow right icon" className="ml-2 w-4 h-4" />
                                </button>
                            ) : (
                                <button onClick={() => { addToFavorites() }} className={`${darkMode ? ' bg-gray-800 text-gray-300 border-gray-500 ' : ' bg-black text-white border-black '} flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full w-96 max-lg:w-full  `}>
                                    Favourite
                                    <img src={`${darkMode ? heart1 : heart}`} alt="arrow right icon" className={`${darkMode ? 'text-gray-200 ' : ' '} ml-2 w-4 h-4`} />
                                </button>
                            )}
                        </div>
                        <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                            <label>
                                <input className="peer/showLabel absolute scale-0" type="checkbox" />
                                <span onClick={() => { handleOpen(3) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[3] && 'max-h-64'} cursor-pointer`}>
                                    <h1 className={`${darkMode ? 'text-gray-300 ' : ''}  flex text-2xl h-14 justify-between items-center font-semibold`}>
                                        Product Description
                                        <img src={`${darkMode ? down1 : down}`} width={`${darkMode ? 32 : 14}`} alt="" className={` transition-all duration-500 ${open[3] && ' rotate-180'}`} />
                                    </h1>
                                    <div className={`${darkMode ? 'text-gray-400' : ' '}`} style={{ wordSpacing: "5px" }}>
                                        {product.description}
                                    </div>
                                    <div className='my-4'>
                                        <ul className='list-disc pl-7'>
                                            <li className={`${darkMode ? 'text-gray-500 ' : ' '}`}>Color Shown : <span className='font-normal'>{clr}</span></li>
                                        </ul>
                                    </div>
                                </span>
                            </label>
                        </div>
                        <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                            <label>
                                <input className="peer/showLabel absolute scale-0" type="checkbox" />
                                <span onClick={() => { handleOpen(0) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[0] && 'max-h-72'} cursor-pointer`}>
                                    <h1 className={`${darkMode ? 'text-gray-300 ' : ''}  flex text-2xl h-14 justify-between items-center font-semibold`}>
                                        Delivery &amp; Returns
                                        <img src={`${darkMode ? down1 : down}`} width={`${darkMode ? 32 : 14}`} alt="" className={`transition-all duration-1000 ${open[0] && ' rotate-180'}`} />
                                    </h1>
                                    <div className={`${darkMode ? 'text-gray-400' : ' '} mb-2`}>
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
                                    </div>
                                </span>
                            </label>
                        </div>
                        <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                            <label>
                                <input className="peer/showLabel absolute scale-0" type="checkbox" />
                                <span onClick={() => { handleOpen(1) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[1] && 'max-h-60'} cursor-pointer`}>
                                    <h1 className={`${darkMode ? 'text-gray-300 ' : ''}  flex text-2xl h-14 justify-between items-center font-semibold`}>
                                        Product &amp; Information
                                        <img src={`${darkMode ? down1 : down}`} width={`${darkMode ? 32 : 14}`} alt="" className={`transition-all duration-1000 ${open[1] && ' rotate-180'}`} />
                                    </h1>
                                    <p className={`${darkMode ? 'text-gray-400' : ' '} mb-6`}>
                                        Declaration of Importer: Direct import by the individual customer
                                        <br /> <br />
                                        Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440
                                        <br />
                                        Net Quantity: 1 Pair
                                    </p>
                                </span>
                            </label>
                        </div>
                        <div className='border-b-2 border-gray-200 pl-2 font-palanquin font-normal text-lg w-96 max-lg:w-full'>
                            <label className="block">
                                <span onClick={() => { handleOpen(2) }} className={`block overflow-hidden rounded-lg py-0 transition-all duration-500 max-h-14 ${open[2] && 'max-h-60'} cursor-pointer`}>
                                    <h1 className={`${darkMode ? 'text-gray-300 ' : ''}  flex text-2xl h-14 justify-between items-center font-semibold`}>
                                        Reviews
                                        <img src={`${darkMode ? down1 : down}`} width={`${darkMode ? 32 : 14}`} alt="" className={`transition-all duration-1000 ${open[2] && ' rotate-180'}`} />
                                    </h1>
                                    <p className={`${darkMode ? 'text-gray-400' : ' '} mb-2`}>
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
            {
                product?.threeD && (
                    <section ref={ref} className='xl:px-32 xl:py-24 pt-8 pb-16 bg-[#FF6452] w-full'>
                        <h1 className="bg-white max-lg:mx-12 max-xl:mx-8 px-6 pb-1 rounded-3xl dark:text-white mt-10 font-palanquin md:text-[46px] sm:text-[36px] max-sm:text-[32px] max-sm:leading-[45px] font-bold w-fit">
                            Take a <span className='text-coral-red'>closer</span> look.
                        </h1>
                        <div className="mx-auto relative  md:w-[800px] sm:h-[667px] w-screen max-sm:h-[300px]">
                            {showOverlay && (
                                <div className='items-center text-center justify-center absolute z-10 bg-transparent backdrop-blur-sm top-0 left-0 w-full h-full flex '>
                                    <div>
                                        <div className='z-10 text-white text-3xl max-sm:text-lg max-sm:px-2 max-sm:leading-[35px] font-semibold bg-[#000] bg-opacity-60 px-9 rounded-lg' >
                                            Double Click and turn to explore
                                        </div>
                                        <div className="progress ">
                                            <div className={`${inView && "progress-value"}`}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="absolute mx-auto  md:w-[800px] md:h-[667px] sm:w-full sm:h-full   w-screen h-[300px]">
                                {/* <Vomero17 /> */}
                                {threeDModel(product?.threeD)}
                            </div>
                        </div>
                    </section>
                )
            }
        </main>
    )
}

export default ProductPage