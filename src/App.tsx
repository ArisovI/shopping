import { enqueueSnackbar } from "notistack";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound/NotFound";
import ProductItem from "./pages/ProductItem";
import "./scss/style.scss";
import { getToken } from "./store/async/async";
import { getComments } from "./store/async/commentSlice";
const App = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getComments());
    dispatch(getToken());

    if (!status) {
      enqueueSnackbar("Вы не авторизованы", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Вы авторизовались", {
        variant: "success",
      });
    }
  }, [dispatch, status]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/product/:id" element={<ProductItem />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default App;
