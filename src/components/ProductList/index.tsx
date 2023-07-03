import { useAppSelector } from "../../hooks/hooks";
import { ProductItem } from "../../types/types";
import ProductListItem from "../ProductListItem";

const ProductList: React.FC = () => {
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
    <div className="product-list">
      ProductList
      <ul>
        {products.map((element: ProductItem) => (
          <ProductListItem key={element.id} element={element} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
