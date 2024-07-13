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
import VerifyPage from "./pages/VerifyPage";
import PageNotFound from "./pages/PageNotFound";
import MyOrdersPage from "./pages/MyOrdersPage";
import { DarkModeProvider } from "./context/dark";
import { FilterProvider } from "./context/filter";
import AdminRoutes from "./routes/AdminRoutes";
import LoaderPage from "./pages/LoaderPage";
import ContactUsPage from "./pages/ContactUsPage";

const App = () => {


  return (
    <div >
      <DarkModeProvider>
        <FilterProvider>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<LoaderPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product-page/:slug" element={<ProductPage />} />
            <Route path="/product-page1" element={<ProductPage1 />} />
            <Route path="/admin" element={<AdminRoutes />}>
              <Route path="create-product" element={<CreateProduct />} />
            </Route>
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/aboutus" element={<AboutUsPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </FilterProvider>
      </DarkModeProvider>
    </div>
  )
}

export default App;