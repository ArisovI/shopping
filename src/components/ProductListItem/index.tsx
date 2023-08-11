import React, { useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { ProductItem } from "../../types/types";
import { AiFillHeart, AiFillInfoCircle } from "react-icons/ai";
import MyButton from "../UI/button/MyButton";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToFavorite } from "../../store/async/favoriteSlice";
import { addToCart } from "../../store/async/cartSlice";
import { Snackbar, Alert, Button } from "@mui/material";
import {
  enqueueSnackbar,
  useSnackbar,
  VariantType,
  SnackbarProvider,
} from "notistack";
interface IProductListItem {
  element: ProductItem;
}
const ProductListItem: React.FC<IProductListItem> = ({ element }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const { status } = useAppSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const intervalRef = useRef<number>();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [num, setNum] = useState<number>(0);

  //hover effect with photos
  const startInterval = () => {
    setIsHover(true);
    intervalRef.current = window.setInterval(() => {
      setNum((prev) => (prev + 1) % element.images.length);
    }, 1500);
  };

  //clear hover effect with photos
  const stopInterval = () => {
    setNum(0);
    window.clearInterval(intervalRef.current);
    setIsHover(false);
  };

  //if this. true favorited or not and for snackbar alert
  const checkFavorite = favorites.find(
    (el: ProductItem) => el.id === element.id
  );

  //add to cart this.
  const addCart = () => {
    if (status) {
      dispatch(addToCart(element));
      enqueueSnackbar("Вы добавили товар в корзину", { variant: "success" });
    } else {
      enqueueSnackbar("Вы не авторизованы", { variant: "error" });
    }
  };

  //add to favorite this.
  const addFavorite = () => {
    dispatch(addToFavorite(element));
    if (checkFavorite) {
      enqueueSnackbar("Вы удалили товар из избранных", { variant: "error" });
    } else {
      enqueueSnackbar("Вы добавили товар в избранные", { variant: "success" });
    }
  };

  return (
    <Fragment key={element.id}>
      <li className="product-list__item">
        <span className="favorite" onClick={() => addFavorite()}>
          <AiFillHeart style={{ fill: checkFavorite ? "red" : "" }} />
        </span>
        <div className="img">
          <img
            onMouseEnter={startInterval}
            onMouseLeave={stopInterval}
            src={isHover ? element.images[num] : element.images[0]}
            alt={element.images[0]}
          />
          <Link to={`product/${element.id}`}>
            <AiFillInfoCircle className="aboutElement" />
          </Link>
        </div>
        <h2 className="title">{element.title}</h2>
        <div className="price">
          <span className="price-discont">{element.price * 1.5} $</span>
          <span className="price-without__discont">{element.price} $</span>
        </div>
        <div className="btns">
          <MyButton onClick={() => addCart()}>В корзину</MyButton>
        </div>
      </li>
    </Fragment>
  );
};

export default ProductListItem;
