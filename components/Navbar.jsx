import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, Grid, Box } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Container from "./Container";

const Navbar = () => {
  const [cartLength, setCartLength] = React.useState(0);
  const { cart } = useSelector(({ app }) => app);

  React.useEffect(() => {
    setCartLength(Object.values(cart).length);
  }, [cart]);

  return (
    <div className="py-2">
      <Container>
        <Grid spacing={2} container alignItems="center" width="100%">
          <Grid item md={4} xs={6}>
            <h1 className="fw-bold text-black">
              <Link href="/">
                <span className="text-primary" role="button">SARAH.</span>
              </Link>
            </h1>
          </Grid>
          <Grid item md={4} xs={0} className="d-none d-md-block">
            <div className="border border-gray py-2 px-3 d-flex align-items-center justify-content-between">
              <input placeholder="Search" className="border-0 w-100" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </div>
          </Grid>
          <Grid
            item
            md={4}
            xs={6}
            display="flex"
            alignItems="center"
            justifyContent="end"
            height="100%"
          >
            <Link href="/cart" role="button">
              <Badge badgeContent={cartLength} color="primary" role="button">
                <ShoppingCartOutlined />
              </Badge>
            </Link>

            <Search
              style={{ color: "gray", fontSize: 16 }}
              className="d-md-none"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Navbar;
