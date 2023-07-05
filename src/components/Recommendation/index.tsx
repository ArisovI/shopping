import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

const Recommendation = () => {
  const { products } = useAppSelector((state) => state.products);
  const randomNum = Math.floor(Math.random() * 10);
  console.log(products[randomNum]);

  return (
    <Link to={`/product/${products[randomNum].id}`} className="recommendation">
      <h2>Рекомендуем</h2>
      <img
        src={products[randomNum].images[0]}
        alt={products[randomNum].title}
      />
      <span>{products[randomNum].title}</span>

      <div>
        <span>{products[randomNum].price * 2} $</span>
        <span>{products[randomNum].price} $</span>
      </div>
    </Link>
  );
};

export default Recommendation;
