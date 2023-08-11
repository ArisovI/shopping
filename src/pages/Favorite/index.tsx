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
import { enqueueSnackbar } from "notistack";
const Favorite = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const { status } = useAppSelector((state) => state.auth);

  //add to cart item
  const addCart = (favorite: ProductItem) => {
    if (status) {
      dispatch(addToCart(favorite));
      enqueueSnackbar("Вы добавили товар в корзину", { variant: "success" });
    }
  };

  //delete all items in cart
  const deleteAllItems = () => {
    dispatch(deleteAll());
    if (favorites.length) {
      enqueueSnackbar("Вы удалили все товары из избранных", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Вы еще не добавили товар", { variant: "error" });
    }
  };

  //delete to favorite item
  const deleteItem = (favorite: ProductItem) => {
    dispatch(addToFavorite(favorite));
    enqueueSnackbar("Вы удалили товар из избранных", { variant: "error" });
  };

  React.useEffect(() => {
    if (!favorites.length) {
      enqueueSnackbar("Вы еще не добавили товар", { variant: "error" });
    }
  }, []);

  return (
    <div className="favorite">
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
                      onClick={() => deleteItem(favorite)}
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
