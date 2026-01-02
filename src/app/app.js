import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ROUTE_CONFIG} from "../config/route-config";
import ProductListPage from "../pages/productList/productListPage";
import ProductDetailsPage from "../pages/productDetails/productDetailsPage";
import CartPage from "../pages/cart/cartPage";
import Header from "../components/Header";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        index path={ROUTE_CONFIG.ROOT}
        element={<ProductListPage/>}
      />
      <Route
        path={ROUTE_CONFIG.PRODUCT}
        element={<ProductDetailsPage />}
      />
      <Route
        path={ROUTE_CONFIG.CART}
        element={<CartPage />}
      />
      <Route
        path={ROUTE_CONFIG.WILDCARD}
        element={<>404</>}
      />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes/>
    </BrowserRouter>
  );
}
