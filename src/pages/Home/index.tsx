import Filter from "../../components/Filter";
import React from "react";
import NavLink from "../../components/NavLink";
import ProductList from "../../components/ProductList";
import Slider from "../../components/Slider";
const Home = () => {

  return (
    <div>
      <NavLink />
      <Slider />
      <main className="main container">
        <Filter />
        <ProductList />
      </main>
    </div>
  );
};

export default Home;
