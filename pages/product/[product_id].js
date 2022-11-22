import { Add, Remove } from "@mui/icons-material";
import { Button, Grid, Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Container from "components/Container";

const Product = () => {
  const [product, setProduct] = React.useState([]);
  const [productLoading, setProductLoading] = React.useState(false);
  const router = useRouter();
  const { product_id } = router.query;

  const productDataGetter = React.useCallback(async () => {
    if (product_id) {
      const data = await fetch(
        `https://fakestoreapi.com/products/${product_id}`
      )
        .then((res) => res.json())
        .then((json) => {
          return json;
        });
      setProduct(data);
      setProductLoading(false);
    }
  }, [product_id]);

  React.useEffect(() => {
    setProductLoading(true);
    productDataGetter();
  }, [productDataGetter, product_id]);

  const test = {
    category: "jewelery",
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    id: 5,
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    price: 695,
    rating: { rate: 4.6, count: 400 },
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  };

  return (
    <div>
      <section className="mb-5">
        <Container>
          {productLoading ? (
            <div></div>
          ) : (
            product && (
              <Grid spacing={2} container alignItems="center">
                <Grid item xs={6}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    height="300px"
                    width="300px"
                    objectFit="contain"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid
                    container
                    alignItems="center"
                    xs={6}
                    maxWidth="100%"
                    width="100%"
                    minWidth="100%"
                  >
                    <Grid item xs={12} className="mb-5">
                      <h3 className="mb-3">{product.title}</h3>
                      <p className="mb-3">{product.description}</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span className="fs-3">{product.price}$</span>
                        </div>
                        <div>
                          <Rating
                            name="half-rating-read"
                            defaultValue={product.rating?.rate}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <Button>
                        <Remove />
                      </Button>
                      <Button variant="outlined">1</Button>
                      <Button>
                        <Add />
                      </Button>
                    </Grid>
                    <Grid item xs={6} className="text-end">
                      <Button variant="outlined">ADD TO CART</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )
          )}
        </Container>
      </section>
    </div>
  );
};

export default Product;
