import React from "react";
import Footer from "../../components/Footer";
import NavLink from "../../components/NavLink";
import MyButton from "../../components/UI/button/MyButton";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ProductItem } from "../../types/types";
import { AiFillDelete, AiFillHeart, AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { addToFavorite, deleteAll } from "../../store/async/favoriteSlice";
const Favorite = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  return (
    <div className="favorite">
      <NavLink />
      <div className="container">
        <div className="favorite-inner">
          <div className="favorite-inner__title">
            <h1>Избранный</h1>
            <MyButton onClick={() => dispatch(deleteAll())}>
              <AiFillDelete />
              <span>Удалить все товары</span>
            </MyButton>
          </div>
          <ul className="favorite-inner__content">
            {favorites.length ? (
              favorites.map((favorite: ProductItem) => (
                <li>
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
                    <MyButton>Добавить в корзину</MyButton>
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
                <h2>Вы ничего не добавляли...</h2>
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
