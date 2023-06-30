import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { ProductItem, ProductState } from "../../types/types";
import { AiFillHeart } from "react-icons/ai";
import MyButton from "../UI/button/MyButton";
interface IProductListItem {
  element: ProductItem;
}
const ProductListItem: React.FC<IProductListItem> = ({ element }) => {
  const { products } = useAppSelector<ProductState>((state) => state.products);
  const { id } = useParams<string>();

  if (id !== undefined) {
    const product = products.find((obj) => obj.id === parseInt(id));

    if (!product) {
      return <div>None</div>;
    }
  } else {
    return (
      <>
        {products.map((element: ProductItem) => (
          <li key={element.id} className="product-list__item">
            <span className="favorite">
              <AiFillHeart />
            </span>
            <img src={element.images[0]} alt={element.images[0]} />
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
        ))}
      </>
    );
  }
  return <></>;
};

export default ProductListItem;
