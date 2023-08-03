import { Snackbar, Alert } from "@mui/material";
import React from "react";
import {
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandSkype,
  TbBrandTelegram,
  TbBrandFacebook,
} from "react-icons/tb";
import { useParams } from "react-router-dom";
import Comment from "../../components/Comment";
import Footer from "../../components/Footer";
import NavLink from "../../components/NavLink";
import Recommendation from "../../components/Recommendation";
import MyButton from "../../components/UI/button/MyButton";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToCart } from "../../store/async/cartSlice";
import { ProductItem as ProductItemState } from "../../types/types";

const ProductItem = () => {
  const { id } = useParams();
  const products = useAppSelector((state) => state.products.products);
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const addCart = (item: ProductItemState) => {
    if (status) {
      dispatch(addToCart(item));

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

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (id !== undefined) {
    const productsFind = products.find(
      (element: ProductItemState) => element.id === parseInt(id)
    );

    if (!productsFind) {
      return <div>Not found</div>;
    }
    return (
      <div>
        <NavLink />
        <div key={productsFind.id}>
          <div className="productItem container">
            <div className="productItem-content">
              <div className="productItem-content__left">
                <img src={productsFind.images[0]} alt="" />
              </div>
              <div className="productItem-content__right">
                <h3>{productsFind.title}</h3>
                <div className="price">
                  <span>Без скидки: {productsFind.price * 2} $</span>
                  <span>Скидка: {productsFind.price} $</span>
                </div>
                <div className="share">
                  <span>Поделитесь: </span>
                  <ul>
                    <li>
                      <a href="#">
                        <TbBrandInstagram />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <TbBrandLinkedin />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <TbBrandSkype />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <TbBrandTelegram />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <TbBrandFacebook />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="desc">
                  <span>Описание:</span>
                  <p>{productsFind.description}</p>
                </div>
                <div className="btn">
                  <MyButton onClick={() => addCart(productsFind)}>
                    Добавить в корзину
                  </MyButton>
                </div>
              </div>
              <Recommendation />
            </div>
            <div className="productItem-comment">
              <Comment />
            </div>
          </div>
        </div>
        <Footer />
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
      </div>
    );
  }
  return <></>;
};

export default ProductItem;
