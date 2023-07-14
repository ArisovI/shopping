import Filter from "../../components/Filter";
import NavLink from "../../components/NavLink";
import ProductList from "../../components/ProductList";
import Slider from "../../components/Slider";
import Footer from "../../components/Footer";
import Category from "../../components/Category";
const Home = () => {
  return (
    <div>
      <NavLink />

      <Slider />
      <main className="main container">
        <Category />

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
