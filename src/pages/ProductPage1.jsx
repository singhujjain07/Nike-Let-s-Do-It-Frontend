import React, { useState } from 'react'
import { AirJordan1Img,jordanRed } from '../constants'
import Button from '../components/Button'
import { heart } from '../assets/icons'
import Navbar from '../components/Navbar'

const ProductPage1 = () => {
    const [shoeClr, setShoeClr] = useState("air-jordan-1-mid-red.png")
    return (
        <main className="relative dark:bg-[#070F2B] ">
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <section className="padding-pro">
                <section className="w-full flex lg:flex-row flex-col justify-center max-container">
                    <div className="relative lg:w-3/5 flex lg:flex-row flex-col items-start w-full  xl:gap-8 gap-4">
                        <div className='h-[85vh] overflow-y-scroll prod_scroll lg:block hidden'>
                            {
                                jordanRed.map((shoe) => (
                                    <div onClick={() => setShoeClr(shoe.src)} className={`border-[1px] overflow-hidden flex bg-center bg-cover justify-center items-center rounded-md ${shoe.src == shoeClr && "border-black"} hover:border-black cursor-pointer max-sm:flex-1 w-[70px] h-[70px] max-sm:p-4 mb-1`}>
                                        <img className='' src={`images/${shoe.src}`} alt={shoe.alt} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className='w-full flex flex-col lg:hidden '>
                            <h3 className="font-palanquin  text-3xl font-bold">
                                Air Jordan 1
                            </h3>
                            <h3 className="font-palanquin text-xl font-medium">
                                Men's Shoes
                            </h3>
                            <h3 className="font-palanquin text-xl font-medium">
                                MRP : ₹ 11 495.00
                            </h3>
                            <p className='info-text'>incl. of taxes</p>
                            <p className='info-text'>(Also includes all applicable duties)</p>
                        </div>
                        <div className='overflow-hidden flex bg-center bg-cover justify-center items-center rounded-xl hover:border-black '>
                            <img className='xl:h-[600px] xl:w-[480px] lg:h-[500px] lg:w-[430px]' src={`images/${shoeClr}`} alt="main-shoe" />
                        </div>
                    </div>
                    <div className="relative flex-1 flex flex-col pb-40 sm:py-4 bg-cover bg-center rounded-b-3xl gap-8 px-5">
                        <div className='w-full lg:flex flex-col hidden'>
                            <h3 className="font-palanquin  text-3xl font-bold">
                                Air Jordan 1
                            </h3>
                            <h3 className="font-palanquin text-xl font-medium">
                                Men's Shoes
                            </h3>
                            <h3 className="font-palanquin text-xl font-medium">
                                MRP : ₹ 11 495.00
                            </h3>
                            <p className='info-text'>incl. of taxes</p>
                            <p className='info-text'>(Also includes all applicable duties)</p>
                        </div>
                        <div className="grid grid-cols-5 gap-1 max-sm:mt-4  2xl:w-4/5">
                            {
                                AirJordan1Img.map((shoe) => (
                                    <div onClick={() => setShoeClr(shoe.src)} className={`border-[1px] overflow-hidden flex bg-center bg-cover justify-center items-center rounded-md ${shoe.src == shoeClr && "border-black"} hover:border-black cursor-pointer max-sm:flex-1 lg:w-[65px] lg:h-[65px] xl:w-[70px] xl:h-[70px] `}>
                                        <img className='' src={`images/${shoe.src}`} alt={shoe.alt} />
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <h3 className="font-palanquin text-start text-xl font-medium">
                                Select Size
                            </h3>
                        </div>
                        <div className='flex flex-col gap-2 justify-center w-full'>
                            <Button label="Add to Bag" backgroundColor={"bg-black"} borderColor={"border-black"} textColor={"text-white"} fullWidth />
                            <button className={`flex justify-center items-center gap-2 px-7 py-4 border border-gray-500 font-montserrat
                                text-lg leading-none
                                rounded-full w-full  `}>
                                Favourite
                                <img src={heart} alt="arrow right icon" className="ml-2  w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    )
}

export default ProductPage1