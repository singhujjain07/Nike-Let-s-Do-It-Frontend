import { useState } from "react";
import ShoeSection from "./pages/sections/ShoeSection";
import Navbar from "./components/Navbar";
import { Hero, CustomerReviews, Footer, PopularProducts, Services, SpecialOffer, Subscribe, SuperQuality } from "./pages/sections";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Products from "./pages/Products";
import HomePage from "./pages/HomePage";
import CreateProduct from "./pages/admin/CreateProduct";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// Toastify : for pop-up notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductPage1 from "./pages/ProductPage1";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutUsPage from "./pages/AboutUsPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  
  return (
    // <div className={`${darkMode && "dark"}`}>
    //   <main className="relative dark:bg-[#070F2B] ">
    //     <div className="fixed top-0 w-full z-20 ">
    //       <Navbar />
    //     </div>
    //     <section className="xl:padding-l wide:padding-r padding-b">
    //       <Hero />
    //     </section>
    //     <section className="padding">
    //       <PopularProducts />
    //     </section>
    //     <section className="padding">
    //       <SuperQuality />
    //     </section>
    //     <section className="padding-x py-10">
    //       <Services />
    //     </section>
    //     <section className="padding">
    //       <SpecialOffer />
    //     </section>
    //     <section className="bg-pale-blue padding">
    //       <CustomerReviews />
    //     </section>
    //     <section className="padding-x sm:py-32 py-16 w-full">
    //       <Subscribe />
    //     </section>
    //     <section className="bg-black padding-x padding-t pb-8">
    //       <Footer />
    //     </section>

    //   </main>
    //   <button onClick={toggleDarkMode} className="fixed  w-16 h-16 bottom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold">
    //     {darkMode ? "LGT" : "DRK"}
    //   </button>
    // </div>
    <div className={`${darkMode && "dark"}`}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/product-page/:slug" element={<ProductPage/>} />
        <Route path="/product-page1" element={<ProductPage1/>} />
        <Route path="/admin/create-product" element={<CreateProduct/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/favorites" element={<FavoritesPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/aboutus" element={<AboutUsPage/>} />
      </Routes>
    </div>
  )
}

export default App;