import { Add, Remove } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Container from "../../components/Container";
import { mobile } from "../../responsive";

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const { cartLength, cart } = useSelector(({ app }) => app);
  const [products, setProducts] = React.useState([]);
  const [productsLoading, setProductsLoading] = React.useState(false);

  const productDataGetter = React.useCallback(async () => {
    const data = await fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    setProducts(data);
    setProductsLoading(false);
  }, []);

  React.useEffect(() => {
    setProductsLoading(true);
    productDataGetter();
  }, [productDataGetter]);

  return (
    <div className="page_container">
      <section className="mb-5">
        <Container>
          <Grid spacing={2} container alignItems="center" width="100%">
            <Grid item xs={12}>
              <h1>YOUR BAG</h1>
            </Grid>
            <Grid item xs={12}>
              <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                  <TopText>Shopping Bag(2)</TopText>
                  <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
                <TopButton type="filled">CHECKOUT NOW</TopButton>
              </Top>
            </Grid>
            <Grid item xs={12}>
              <Bottom>
                <Grid spacing={2} container alignItems="center" width="100%">
                  <Grid item lg={8} xs={12}>
                    <Info>
                      {productsLoading ? (
                        <Skeleton count={1} height={240} />
                      ) : (
                        products &&
                        products.map((product, index) => {
                          if (cart[product.id] && cart[product.id] > 0)
                            return (
                              <Product key={index}>
                                <ProductDetail>
                                  <Image
                                    src={product.image}
                                    alt={product.title}
                                  />
                                  <Details>
                                    <span>
                                      <b>Product:</b> {product.title}
                                    </span>
                                    <span>
                                      <b>ID:</b> {product.id}
                                    </span>
                                  </Details>
                                </ProductDetail>
                                <PriceDetail>
                                  <ProductAmountContainer>
                                    <Add />
                                    <ProductAmount>
                                      {cart[product.id]}
                                    </ProductAmount>
                                    <Remove />
                                  </ProductAmountContainer>
                                  <ProductPrice>${product.price}</ProductPrice>
                                </PriceDetail>
                              </Product>
                            );
                          else return null;
                        })
                      )}

                      <Hr />
                    </Info>
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Summary>
                      <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                      <SummaryItem>
                        <span>Subtotal</span>
                        <span>$ 80</span>
                      </SummaryItem>
                      <SummaryItem>
                        <span>Estimated Shipping</span>
                        <span>$ 5.90</span>
                      </SummaryItem>
                      <SummaryItem>
                        <span>Shipping Discount</span>
                        <span>$ -5.90</span>
                      </SummaryItem>
                      <SummaryItem type="total">
                        <span>Total</span>
                        <span>$ 80</span>
                      </SummaryItem>
                      <Button>CHECKOUT NOW</Button>
                    </Summary>
                  </Grid>
                </Grid>
              </Bottom>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export default Cart;
