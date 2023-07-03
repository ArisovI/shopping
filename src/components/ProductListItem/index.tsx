import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ProductItem } from "../../types/types";
import { AiFillHeart, AiFillInfoCircle } from "react-icons/ai";
import MyButton from "../UI/button/MyButton";
interface IProductListItem {
  element: ProductItem;
}
const ProductListItem: React.FC<IProductListItem> = ({ element }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [num, setNum] = useState<number>(0);
  const intervalRef = useRef<number>();

  const startInterval = () => {
    setIsHover(true);
    intervalRef.current = window.setInterval(() => {
      setNum((prev) => (prev + 1) % element.images.length);
    }, 1500);
  };

  const stopInterval = () => {
    setNum(0);
    window.clearInterval(intervalRef.current);
    setIsHover(false);
  };
  return (
    <li key={element.id} className="product-list__item">
      <span className="favorite">
        <AiFillHeart />
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
        <MyButton>Рассрочка</MyButton>
        <MyButton>В корзину</MyButton>
      </div>
    </li>
  );
};

export default ProductListItem;
