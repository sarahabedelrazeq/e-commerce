import React from "react";
import Categories from "components/Categories";
import Products from "components/Products";
import ProductsSkeleton from "components/Products/Skeleton";
import CategoriesSkeleton from "components/Categories/Skeleton";
import Slider from "components/Slider";

const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [productsLoading, setProductsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [categoriesLoading, setCategoriesLoading] = React.useState(false);

  const productDataGetter = React.useCallback(async () => {
    const data = await fetch("https://fakestoreapi.com/products?limit=8")
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    setProducts(data);
    setProductsLoading(false);
  }, []);

  const categoryDataGetter = React.useCallback(async () => {
    const data = await fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    setCategories(data);
    setCategoriesLoading(false);
  }, []);

  React.useEffect(() => {
    setProductsLoading(true);
    productDataGetter();
  }, [productDataGetter]);

  React.useEffect(() => {
    setCategoriesLoading(true);
    categoryDataGetter();
  }, [categoryDataGetter]);

  return (
    <div className="page_container">
      <section className="mb-5">
        <Slider />
      </section>
      <section className="mb-5">
        {categoriesLoading ? (
          <CategoriesSkeleton count={1} height={240} />
        ) : (
          categories && <Categories data={categories} />
        )}
      </section>
      <section className="mb-5">
        {productsLoading ? (
          <ProductsSkeleton count={1} height={240} />
        ) : (
          products && <Products data={products} />
        )}
      </section>
    </div>
  );
};

export default Home;
