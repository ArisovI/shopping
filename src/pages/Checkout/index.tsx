import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Tab,
  Checkbox,
  FormGroup,
} from "@mui/material";
import React, { useState } from "react";
import MyButton from "../../components/UI/button/MyButton";
import MyInput from "../../components/UI/input/MyInput";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { AiFillDelete } from "react-icons/ai";
import { deleteAllToCart, deleteToCart } from "../../store/async/cartSlice";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { ProductItem } from "../../types/types";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const [isDelivery, setIsDelivery] = useState(false);

  const totalPrice = React.useMemo(() => {
    return cart.reduce((res, acc) => {
      return (res += acc.count * acc.price);
    }, 0);
  }, [cart]);

  const handlePay = () => {
    if (cart.length) {
      enqueueSnackbar("Поздравляю вы сделали покупку", { variant: "success" });
    }
    dispatch(deleteAllToCart());

    setTimeout(() => {
      enqueueSnackbar("Ваша корзина пустая", { variant: "error" });
      navigate("/");
    }, 2000);
  };

  const deleteItemInCart = (cartItem: ProductItem) => {
    dispatch(deleteToCart(cartItem));
    enqueueSnackbar("Вы удалили товар из корзины", { variant: "error" });
  };

  return (
    <div className="checkout">
      <div className="checkout-inner">
        <h1>Checkout</h1>
        <ul className="checkout-order">
          {cart.map((cartItem) => (
            <li key={cartItem.id}>
              <img src={cartItem.images[0]} alt={cartItem.title} />
              <h3>{cartItem.title}</h3>
              <div>
                <span>Со скидкой</span>
                <span>
                  x{cartItem.count} = {cartItem.price * cartItem.count} $
                </span>
              </div>
              <MyButton onClick={() => deleteItemInCart(cartItem)}>
                <AiFillDelete />
              </MyButton>
            </li>
          ))}
        </ul>
        <div className="checkout-profile">
          <div className="checkout-profile__item">
            <span>Имя</span>
            <MyInput type="search" placeholder="Имя" />
          </div>
          <div className="checkout-profile__item">
            <span>Фамилия</span>
            <MyInput type="search" placeholder="Фамилия" />
          </div>
          <div className="checkout-profile__item">
            <span>Телефон номер</span>
            <MyInput type="search" placeholder="Телефон номер" />
          </div>
        </div>
        <div className="checkout-delivery">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="С доставкой 100 $"
              checked={isDelivery}
              onChange={() => setIsDelivery(!isDelivery)}
              className="span"
            />
          </FormGroup>
        </div>
        <span className="checkout-totalPrice">
          Общяя стоймость всех товаров:
          {isDelivery ? totalPrice + 100 : totalPrice} $
        </span>
        <MyButton onClick={handlePay}>Оплатить</MyButton>
      </div>
    </div>
  );
};

export default Checkout;
