import { Grid } from "@mui/material";
import CategoryItem from "../CategoryItem";
import Container from "../Container";



const Categories = ({data}) => {
  return (
    <div>
      <Container>
        <Grid spacing={2} container alignItems="center">
          {data.map((item, index) => (
            <Grid item lg={3} xs={6} key={index}>
              <CategoryItem item={item} key={item.id} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Categories;
