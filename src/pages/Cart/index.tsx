import React from "react";
import Footer from "../../components/Footer";
import NavLink from "../../components/NavLink";
import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import MyButton from "../../components/UI/button/MyButton";
import {
  deleteAllToCart,
  deleteToCart,
  minusCount,
  plusCount,
} from "../../store/async/cartSlice";
import { ProductItem } from "../../types/types";
import { addToFavorite } from "../../store/async/favoriteSlice";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { favorites } = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();

  //total price in cart
  const totalPrice = cart.reduce((acc, result) => {
    return (acc += result.price * result.count);
  }, 0);

  //delete all items in cart
  const deleteAllItems = () => {
    dispatch(deleteAllToCart());
    if (cart.length) {
      enqueueSnackbar("Вы удалили все товары из корзины", { variant: "error" });
    } else {
      enqueueSnackbar("Вы еще не добавляли товаров в корзину", {
        variant: "error",
      });
    }
  };

  const addToFavoriteBtn = (element: ProductItem) => {
    dispatch(addToFavorite(element));

    const checkFavorite = favorites.find(
      (el: ProductItem) => el.id === element.id
    );

    if (checkFavorite) {
      enqueueSnackbar("Вы удалили товар из избранных", { variant: "error" });
    } else {
      enqueueSnackbar("Вы добавили товар в избранные", { variant: "success" });
    }
  };

  const deleteToCartItem = (element: ProductItem) => {
    dispatch(deleteToCart(element));
    enqueueSnackbar("Вы удалили товар из корзины", { variant: "error" });
  };

  return (
    <div className="cart">
      <NavLink />
      <div className="container">
        <div className="cart-inner">
          <div className="cart-inner__title">
            <h2>Корзина</h2>
            <MyButton onClick={deleteAllItems}>
              <AiFillDelete />
              <span>Удалить все товары</span>
            </MyButton>
          </div>
          <div className="cart-inner__content">
            {cart.length ? (
              <>
                <ul className="cart-inner__content_products">
                  {cart.map((element) => {
                    const isFavorited = favorites.find(
                      (el: ProductItem) => el.id === element.id
                    );

                    return (
                      <li className="products" key={element.id}>
                        <img src={element.images[0]} alt={element.title} />
                        <div className="products-about">
                          <div className="products-about__price">
                            <span>
                              Цена продукта со скидки: {element.price} $
                            </span>
                            <span>
                              Цена продукта без скидки: {element.price * 2} $
                            </span>
                          </div>
                          <h3>{element.title}</h3>
                        </div>
                        <div className="products-btns">
                          <AiFillDelete
                            onClick={() => deleteToCartItem(element)}
                          />
                          <AiFillHeart
                            style={{ fill: isFavorited ? "red" : "" }}
                            onClick={() => addToFavoriteBtn(element)}
                          />
                        </div>
                        <div className="products-count">
                          <MyButton
                            onClick={() => dispatch(minusCount(element.id))}
                          >
                            -
                          </MyButton>
                          <span>{element.count}</span>
                          <MyButton
                            onClick={() => dispatch(plusCount(element.id))}
                          >
                            +
                          </MyButton>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="cart-inner__content_total">
                  <h2>Ваша корзина</h2>
                  <ul>
                    {cart.map((element) => (
                      <li key={element.id}>
                        <span>{element.title}</span>
                        <div>
                          <span>Цена:</span>
                          <span>{element.price * element.count} $</span>
                        </div>
                        <div>
                          <span>Количество:</span>
                          <span>{element.count} </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <div>
                      <span>Ваш платеж:</span>
                      <span>Цена: {totalPrice}</span>
                    </div>
                    <Link to="/checkout">Покупать</Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="favorite-inner__content_false">
                <h2>Вы ничего не добавляли в корзину...</h2>
                <Link to="/">Перейти на главную страницу</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
