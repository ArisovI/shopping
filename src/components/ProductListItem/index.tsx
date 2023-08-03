import React, { useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { ProductItem } from "../../types/types";
import { AiFillHeart, AiFillInfoCircle } from "react-icons/ai";
import MyButton from "../UI/button/MyButton";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToFavorite } from "../../store/async/favoriteSlice";
import { addToCart } from "../../store/async/cartSlice";
import { Snackbar, Alert } from "@mui/material";
interface IProductListItem {
  element: ProductItem;
}
const ProductListItem: React.FC<IProductListItem> = ({ element }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const { status } = useAppSelector((state) => state.auth);

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

  //for snackbar
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //for snackbar
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

  //for snackbar
  const [openAdmin, setOpenAdmin] = useState(false);
  const handleCloseAdmin = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAdmin(false);
  };

  //if this. true favorited or not and for snackbar alert
  const checkFavorite = favorites.find(
    (el: ProductItem) => el.id === element.id
  );

  //add to cart this.
  const addCart = () => {
    if (status) {
      dispatch(addToCart(element));

      setOpenCart(true);
      setTimeout(() => {
        setOpenCart(false);
      }, 3000);
    }
  };

  //add to favorite this.
  const addFavorite = () => {
    dispatch(addToFavorite(element));

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  React.useEffect(() => {
    if (status) {
      setOpenAdmin(true);
      setTimeout(() => {
        setOpenAdmin(false);
      }, 3000);
    }
  }, [status]);

  return (
    <Fragment key={element.id}>
      <li className="product-list__item">
        <span className="favorite" onClick={addFavorite}>
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
          <MyButton onClick={addCart}>В корзину</MyButton>
        </div>
      </li>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {checkFavorite
            ? "Вы добавили товар в избранные"
            : "Вы удалили товар из избранных"}
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
      {status && (
        <Snackbar
          open={openAdmin}
          autoHideDuration={10000}
          onClose={handleCloseAdmin}
          className="snackBarAdmin"
        >
          <Alert
            onClose={handleCloseAdmin}
            severity="success"
            sx={{ width: "100%" }}
          >
            Поздравляю вы авторизовались
          </Alert>
        </Snackbar>
      )}
    </Fragment>
  );
};

export default ProductListItem;
