import { enqueueSnackbar } from "notistack";
import React, { ChangeEvent, useState } from "react";
import {
  FaPhone,
  FaLocationArrow,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch,
  FaRegTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { exitUser } from "../../store/async/authSlice";
import { deleteAllToCart } from "../../store/async/cartSlice";
import MyInput from "../UI/input/MyInput";
const NavLink = () => {
  const dispatch = useAppDispatch();
  const arr: string[] = [
    "о нас",
    "способы оплаты",
    "рассрочка",
    "гарантия на товары",
    "бесплатная доставка",
  ];
  const [searchValue, setSearchValue] = useState<string>("");
  const [userExit, setUserExit] = useState<boolean>(true);
  const { products } = useAppSelector((state) => state.products);
  const { info, status } = useAppSelector((state) => state.auth);
  const { favorites } = useAppSelector((state) => state.favorites);
  const { cart } = useAppSelector((state) => state.cart);

  const exit = () => {
    setUserExit(!userExit);
    dispatch(exitUser());
    dispatch(deleteAllToCart());

    enqueueSnackbar("Вы вышли с аккаутна", { variant: "error" });
  };

  return (
    <div className="navlink">
      <div className="navlink-top">
        <div className="container">
          <div className="navlink-top__innner">
            <div className="location">
              <FaLocationArrow />
              <span>Ташкент</span>
            </div>
            <ul>
              {arr.map((element: string, index: number) => (
                <li key={index}>
                  <a href="#">{element}</a>
                </li>
              ))}
            </ul>
            <a href="tel:998905949914">
              <FaPhone />
              <span> +998905949914</span>
            </a>
          </div>
        </div>
      </div>
      <div className="navlink-bottom">
        <div className="container">
          <div className="navlink-bottom__inner">
            <Link className="navlink-logo" to="/">
              LOGO
            </Link>
            <div className="navlink-search">
              <FaSearch className="navlink-search__btn" />
              <MyInput
                type="text"
                placeholder="Искать товары"
                value={searchValue}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(event.target.value)
                }
                className={
                  searchValue.trim().length > 0 ? "navlink-focus-btn" : ""
                }
              />
              {searchValue.trim().length ? (
                <ul className="searchItems">
                  {products
                    .filter((element) => {
                      if (
                        element.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                      ) {
                        return true;
                      } else {
                        return false;
                      }
                    })
                    .map((element) => (
                      <li key={element.id}>
                        <Link
                          to={`/product/${element.id}`}
                          onClick={() => setSearchValue("")}
                        >
                          {element.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              ) : (
                ""
              )}
              {searchValue.trim().length > 0 ? (
                <FaRegTimesCircle
                  className="navlink-clear-btn"
                  onClick={() => setSearchValue("")}
                />
              ) : (
                ""
              )}
            </div>

            <ul>
              <li>
                <Link to="/favorite">
                  {favorites.length > 0 ? (
                    <span className="favorite-length">{favorites.length}</span>
                  ) : (
                    ""
                  )}
                  <FaHeart />
                  <span>Favorite</span>
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  {cart.length > 0 ? (
                    <span className="favorite-length">{cart.length}</span>
                  ) : (
                    ""
                  )}
                  <FaShoppingCart />
                  <span>Cart</span>
                </Link>
              </li>
              <div>
                {!status ? (
                  <Link
                    to="/auth"
                    className="navlink-user"
                    onClick={() => setUserExit(!userExit)}
                  >
                    <FaUser />

                    <span className="navlink-user__name">
                      {status ? info?.name : "User"}
                    </span>
                  </Link>
                ) : (
                  <div
                    className="navlink-user"
                    onClick={() => setUserExit(!userExit)}
                  >
                    <img src={info?.avatar} alt="" />
                    <span className="navlink-user__name">
                      {status ? info?.name : "User"}
                    </span>
                  </div>
                )}
                <div
                  onClick={() => exit()}
                  className={
                    userExit
                      ? "navlink-exit__btn"
                      : "navlink-exit__btn navlink-exit__btn_animation"
                  }
                >
                  <FaRegTimesCircle />
                  <span>Exit</span>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavLink;
