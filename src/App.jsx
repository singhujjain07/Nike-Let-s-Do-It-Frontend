import { useState } from "react";
import ShoeSection from "./pages/sections/ShoeSection";
import Navbar from "./components/Navbar";
import { Hero, CustomerReviews, Footer, PopularProducts, Services, SpecialOffer, Subscribe, SuperQuality } from "./pages/sections";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import CreateProduct from "./pages/admin/CreateProduct";

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
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/product-page" element={<ProductPage/>} />
        <Route path="/admin/create-product" element={<CreateProduct/>} />
        {/* <Route path="/" element={<CreateProduct/>} /> */}
      </Routes>
    </div>
  )
}

export default App;