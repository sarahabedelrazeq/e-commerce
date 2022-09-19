import { Grid } from "@mui/material";
import Container from "../Container";
import Product from "../Product";

const Products = ({data}) => {
  return (
    <div>
      <Container>
        <Grid spacing={2} container alignItems="center">
          {data.map((item, index) => (
            <Grid item lg={3} sm={4}  xs={6} key={index}>
              <Product item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Products;
