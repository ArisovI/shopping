import React from "react";

const Category = () => {
  const categoryArr: string[] = [
    "Все категории",
    "Electronics",
    "Furniture",
    "Shoes",
    "Others",
  ];
  return (
    <div className="category container">
      <ul>
        {categoryArr.map((li, index) => (
          <li key={index}>{li}</li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
