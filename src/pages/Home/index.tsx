import Filter from "../../components/Filter";
import React from "react";
import NavLink from "../../components/NavLink";
import ProductList from "../../components/ProductList";
import Slider from "../../components/Slider";
import Footer from "../../components/Footer";
import Category from "../../components/Category";
const Home = () => {
  return (
    <div>
      <NavLink />
      <Category />

      <Slider />
      <main className="main container">
        <div className="content">
          <Filter />
          <ProductList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
