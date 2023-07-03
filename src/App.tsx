import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./hooks/hooks";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound/NotFound";
import ProductItem from "./pages/ProductItem";
import "./scss/style.scss";
import { getProducts } from "./store/async/productsSlice";
const App = () => {
  
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth" element={<Auth />} />
      <Route path="cart" element={<Cart />} />
      <Route path="favorite" element={<Favorite />} />
      <Route path="product/:id" element={<ProductItem />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
