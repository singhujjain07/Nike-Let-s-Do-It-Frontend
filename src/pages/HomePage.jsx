import { useEffect, useState } from "react";
import ShoeSection from "./sections/ShoeSection";
import Navbar from "../components/Navbar";
import { Hero, CustomerReviews, Footer, PopularProducts, Services, SpecialOffer, Subscribe, SuperQuality } from "./sections";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./ProductPage";
import {toast} from 'react-toastify'

const HomePage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }
    return (
        <div className={`${darkMode && "dark"}`}>
            <main className="relative slow dark:bg-[#070F2B] ">
                <div className="fixed top-0 w-full z-20 ">
                    <Navbar />
                </div>
                <section className="xl:padding-l wide:padding-r padding-b">
                    <Hero />
                </section>
                {/* <section className="padding">
                    <PopularProducts />
                </section> */}
                <section className="padding">
                    <SuperQuality />
                </section>
                <section className="padding-x py-10">
                    <Services />
                </section>
                <section className="padding">
                    <SpecialOffer />
                </section>
                <section className="bg-pale-blue padding">
                    <CustomerReviews />
                </section>
                <section className="padding-x sm:py-32 py-16 w-full">
                    <Subscribe />
                </section>
                <section className="bg-black padding-x padding-t pb-8">
                    <Footer />
                </section>

            </main>
            <button onClick={toggleDarkMode} className="fixed  w-16 h-16 bottom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold">
                {darkMode ? "LGT" : "DRK"}
            </button>
        </div>
    )
}

export default HomePage