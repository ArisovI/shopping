import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { getProducts as fetchProducts} from "../../store/async/async";
const Category = () => {
  const dispatch = useAppDispatch();
  const [categoryId, setCategoryId] = useState<number>(0);

  React.useEffect(() => {
    dispatch(fetchProducts({ categoryId, value: [0, 1000] }));
  }, [dispatch, categoryId]);

  const categoryArr: string[] = [
    "Все категории",
    "Electronics",
    "Furniture",
    "Shoes",
    "Others",
  ];

  const changeCategoryId = (index: number) => {
    setCategoryId(index);
  };

  return (
    <div className="category container">
      <ul>
        {categoryArr.map((element, index) => (
          <li
            className={categoryId === index ? "category-active" : ""}
            onClick={() => changeCategoryId(index)}
            key={index}
          >
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
