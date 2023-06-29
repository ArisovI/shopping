import Filter from "../../components/Filter";
import React from "react";
import NavLink from "../../components/NavLink";
import ProductList from "../../components/ProductList";
import Slider from "../../components/Slider";
import { useAppDispatch } from "../../hooks/useDispatch";
import { getProducts } from "../../store/async/productsSlice";
const Home = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

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
