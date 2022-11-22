import Products from "components/Products";
import ProductsSkeleton from "components/Products/Skeleton";
import React from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import Container from "components/Container";

const ProductList = () => {
  const [products, setProducts] = React.useState([]);
  const [productsLoading, setProductsLoading] = React.useState(false);
  const router = useRouter();
  const { category_name } = router.query;

  const productDataGetter = React.useCallback(async () => {
    const data = await fetch(
      `https://fakestoreapi.com/products/category/${category_name}`
    )
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    setProducts(data);
    setProductsLoading(false);
  }, [category_name]);

  React.useEffect(() => {
    setProductsLoading(true);
    productDataGetter();
  }, [productDataGetter, category_name]);

  return (
    <div>
      <section className="mb-5">
        <Container>
          <Grid spacing={2} container alignItems="center">
            <Grid item xs={12}>
              <h4 className="mb-3">{category_name}</h4>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              {productsLoading ? (
                <ProductsSkeleton count={1} height={240} />
              ) : (
                products && <Products data={products} />
              )}
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export default ProductList;
