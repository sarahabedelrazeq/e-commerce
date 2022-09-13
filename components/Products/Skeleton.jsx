import { Container, Grid } from "@mui/material";
import { Skeleton as MaterialSkeleton } from "@mui/material";

const Skeleton = ({ data }) => {
  return (
    <div>
      <Container>
        <Grid spacing={2} container alignItems="center">
          {[1, 2, 3, 4].map((item, index) => (
            <Grid item lg={3} sm={4} xs={6} key={index}>
              <MaterialSkeleton count={1} height={350} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Skeleton;
