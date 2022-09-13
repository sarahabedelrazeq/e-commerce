import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, Container, Grid, Box } from "@mui/material";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="py-2">
      <Container>
        <Grid spacing={2} container alignItems="center" width="100%">
          <Grid item md={4} xs={6}>
            <h1 className="fw-bold text-black">
              <Link href="/">LAMA.</Link>
            </h1>
          </Grid>
          <Grid item md={4} xs={4} className="d-none d-md-block">
            <div className="border border-gray py-2 px-3 d-flex align-items-center justify-content-between">
              <input placeholder="Search" className="border-0" />
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
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Navbar;
