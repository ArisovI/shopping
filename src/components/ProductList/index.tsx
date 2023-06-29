import React from "react";
import { useAppSelector } from "../../hooks/useSelector";
import { ProductItem } from "../../types/types";
import ProductListItem from "../ProductListItem";

const ProductList = () => {
  const { products, isError, isLoading } = useAppSelector(
    (state) => state.products
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      ProductList
      {products.map((element: ProductItem) => (
        <ProductListItem key={element.id} element={element} />
      ))}
    </div>
  );
};

export default ProductList;
