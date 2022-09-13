import styled from "styled-components";
import Products from "../../components/Products";
import { mobile } from "../../responsive";
import ProductsSkeleton from "../../components/Products/Skeleton";
import React from "react";
import { useRouter } from "next/router";
import { Container, Grid } from "@mui/material";

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

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
              <Title>Dresses</Title>
            </Grid>
            <Grid item xs={12}>
              <FilterContainer>
                <Filter>
                  <FilterText>Filter Products:</FilterText>
                  <Select>
                    <Option disabled selected>
                      Color
                    </Option>
                    <Option>White</Option>
                    <Option>Black</Option>
                    <Option>Red</Option>
                    <Option>Blue</Option>
                    <Option>Yellow</Option>
                    <Option>Green</Option>
                  </Select>
                  <Select>
                    <Option disabled selected>
                      Size
                    </Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                  </Select>
                </Filter>
                <Filter>
                  <FilterText>Sort Products:</FilterText>
                  <Select>
                    <Option selected>Newest</Option>
                    <Option>Price (asc)</Option>
                    <Option>Price (desc)</Option>
                  </Select>
                </Filter>
              </FilterContainer>
            </Grid>
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
