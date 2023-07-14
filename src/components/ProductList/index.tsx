import { useAppSelector } from "../../hooks/hooks";
import { ProductItem } from "../../types/types";
import ProductListItem from "../ProductListItem";
import { Skeleton } from "@mui/material";

const ProductList: React.FC = () => {
  const { products, isError, isLoading } = useAppSelector(
    (state) => state.products
  );

  if (isLoading) {
    return (
      <div className="product-list">
        <ul>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <li>
              <Skeleton
                key={index}
                variant="rounded"
                height={400}
                width={250}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="product-list">
      <ul>
        {products.map((element: ProductItem) => (
          <ProductListItem key={element.id} element={element} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
