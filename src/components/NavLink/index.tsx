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
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
const NavLink = () => {
  const arr: string[] = [
    "о нас",
    "способы оплаты",
    "рассрочка",
    "гарантия на товары",
    "бесплатная доставка",
  ];
  const [searchValue, setSearchValue] = useState<string>("");
  const [userExit, setUserExit] = useState<boolean>(false);
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
        <div className="navlink-bottom"></div>
      </div>
      <div className="navlink-bottom">
        <div className="container">
          <div className="navlink-bottom__inner">
            <a href="#" className="navlink-logo">
              LOGO
            </a>
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
                <FaHeart />
                <span>Favorite</span>
              </li>
              <li>
                <FaShoppingCart />
                <span>Cart</span>
              </li>
              <div onClick={() => setUserExit(!userExit)}>
                <FaUser />
                <span className="navlink-user__name">User</span>

                <div
                  className="navlink-exit__btn"
                  style={{
                    bottom: userExit ? "-110%" : "",
                    top: userExit ? "auto" : "0",
                  }}
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
