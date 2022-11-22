import { Button, Grid } from "@mui/material";
import Image from "next/future/image";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Amount from "components/Amount";
import Container from "components/Container";
import { addToCart } from "store/app";

const Cart = () => {
  const { cart } = useSelector(({ app }) => app);
  const [products, setProducts] = React.useState([]);
  const [productsLoading, setProductsLoading] = React.useState(false);
  const dispatch = useDispatch();

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

  const handleCartCount = (productId, x) => {
    dispatch(addToCart({ id: productId, num: x }));
  };

  return (
    <div className="page_container">
      <section className="mb-5">
        <Container>
          <Grid spacing={2} container width="100%">
            <Grid item xs={12}>
              <h1>YOUR BAG</h1>
            </Grid>
            <Grid item lg={8} xs={12}>
              <div>
                {productsLoading ? (
                  <Skeleton count={1} height={240} />
                ) : (
                  products &&
                  products.map((product, index) => {
                    if (cart[product.id] && cart[product.id] > 0)
                      return (
                        <div key={index}>
                          <Grid spacing={3} container width="100%" m={0}>
                            <Grid item xs={4}>
                              <div>
                                <Image
                                  src={product.image}
                                  alt={product.title}
                                  className="mw-100"
                                  width={200}
                                  height={200}
                                  layout="fixed"
                                  priority
                                />
                              </div>
                            </Grid>
                            <Grid item xs={5} className="pt-4">
                              <div>
                                <h6 className="mb-4">
                                  <b>Product:</b> {product.title}
                                </h6>
                              </div>
                              <div>
                                <h6>
                                  <b>ID:</b> {product.id}
                                </h6>
                              </div>
                            </Grid>
                            <Grid
                              item
                              xs={3}
                              className="d-flex flex-column justify-content-between"
                            >
                              <div className="d-flex justify-content-end">
                                <Amount
                                  number={cart[product.id]}
                                  onChange={(x) =>
                                    handleCartCount(product.id, x)
                                  }
                                />
                              </div>
                              <div className="d-flex justify-content-end">
                                <h4 className="fw-bold">${product.price}</h4>
                              </div>
                            </Grid>
                          </Grid>
                          <hr />
                        </div>
                      );
                    else return null;
                  })
                )}
              </div>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className="border border-1 p-4 rounded-3">
                <h1 className="fw-light">ORDER SUMMARY</h1>
                <div className="d-flex justify-content-between my-4 fs-5">
                  <span>Subtotal</span>
                  <span>$ 80</span>
                </div>
                <div className="d-flex justify-content-between my-4 fs-5">
                  <span>Estimated Shipping</span>
                  <span>$ 5.90</span>
                </div>
                <div className="d-flex justify-content-between my-4 fs-5">
                  <span>Shipping Discount</span>
                  <span>$ -5.90</span>
                </div>
                <div
                  className="d-flex justify-content-between my-4 fs-2"
                  type="total"
                >
                  <span>Total</span>
                  <span>$ 80</span>
                </div>
                <Button variant="contained" className="w-100">
                  CHECKOUT NOW
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export default Cart;
