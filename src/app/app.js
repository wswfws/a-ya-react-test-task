import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ROUTE_CONFIG} from "../config/route-config";
import ProductListPage from "../pages/productList/productListPage";
import ProductDetailsPage from "../pages/productDetails/productDetailsPage";

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
        element={<>Корзина</>}
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
      <AppRoutes/>
    </BrowserRouter>
  );
}
