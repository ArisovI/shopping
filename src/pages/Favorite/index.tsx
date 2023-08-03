import React from "react";
import Footer from "../../components/Footer";
import NavLink from "../../components/NavLink";
import MyButton from "../../components/UI/button/MyButton";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ProductItem } from "../../types/types";
import { AiFillDelete, AiFillHeart, AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { addToFavorite, deleteAll } from "../../store/async/favoriteSlice";
import { addToCart } from "../../store/async/cartSlice";
import { Snackbar, Alert } from "@mui/material";
const Favorite = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const { status } = useAppSelector((state) => state.auth);
  const addCart = (favorite: ProductItem) => {
    if (status) {
      dispatch(addToCart(favorite));

      setOpenCart(true);
      setTimeout(() => {
        setOpenCart(false);
      }, 3000);
    }
  };
  const [openCart, setOpenCart] = React.useState<boolean>(false);
  const handleCloseCart = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenCart(false);
  };

  //delete all items in cart
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const handleCloseDelete = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDelete(false);
  };
  const deleteAllItems = () => {
    dispatch(deleteAll());
    setOpenDelete(true);
    setTimeout(() => {
      setOpenDelete(false);
    }, 3000);
  };

  return (
    <div className="favorite">
      <Snackbar
        open={openDelete}
        autoHideDuration={10000}
        onClose={handleCloseDelete}
        className="snackBarCart"
      >
        <Alert
          onClose={handleCloseDelete}
          severity="success"
          sx={{ width: "100%" }}
        >
          Вы удалили все товары
        </Alert>
      </Snackbar>
      <Snackbar
        open={openCart}
        autoHideDuration={10000}
        onClose={handleCloseCart}
        className="snackBarCart"
      >
        <Alert
          onClose={handleCloseCart}
          severity="success"
          sx={{ width: "100%" }}
        >
          Вы добавили товар в корзину
        </Alert>
      </Snackbar>
      <NavLink />
      <div className="container">
        <div className="favorite-inner">
          <div className="favorite-inner__title">
            <h1>Избранный</h1>
            <MyButton onClick={deleteAllItems}>
              <AiFillDelete />
              <span>Удалить все товары</span>
            </MyButton>
          </div>
          <ul className="favorite-inner__content">
            {favorites.length ? (
              favorites.map((favorite: ProductItem) => (
                <li key={favorite.id}>
                  <img src={favorite.images[0]} alt={favorite.title} />
                  <h2>{favorite.title}</h2>
                  <div className="price">
                    <span className="price-discont">
                      Со скидкой {favorite.price * 1.5} $
                    </span>
                    <span className="price-without__discont">
                      Без {favorite.price} $
                    </span>
                  </div>
                  <div className="btns">
                    <MyButton onClick={() => addCart(favorite)}>
                      Добавить в корзину
                    </MyButton>
                    <AiFillHeart
                      onClick={() => dispatch(addToFavorite(favorite))}
                      style={{ fill: favorite.favorites ? "red" : "black" }}
                    />
                    <Link to={`/product/${favorite.id}`}>
                      <AiFillInfoCircle />
                    </Link>
                  </div>
                </li>
              ))
            ) : (
              <div className="favorite-inner__content_false">
                <h2>Вы ничего не добавляли в избранный...</h2>
                <Link to="/">Перейти на главную страницу</Link>
              </div>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorite;
