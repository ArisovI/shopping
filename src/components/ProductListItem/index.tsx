import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useSelector";
import { ProductItem, ProductState } from "../../types/types";
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
      <div>
        {products.map((element: ProductItem) => (
          <div key={element.id}>a</div>
        ))}
      </div>
    );
  }
  return <></>;
};

export default ProductListItem;
