import { Grid } from "@mui/material";
import { Skeleton as MaterialSkeleton } from "@mui/material";
import Container from "../Container";

const Skeleton = () => {
  return (
    <div>
      <Container>
        <Grid spacing={2} container alignItems="center">
          {[1, 2, 3].map((item, index) => (
            <Grid item lg={3} xs={6} key={index}>
              <MaterialSkeleton count={1} height="50vh" />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Skeleton;
