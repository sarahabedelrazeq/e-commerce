import { styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Container = styled("div")(({ theme, ...props }) => ({
  flex: "1",
  margin: "3px",
  height: "50vh",
  position: "relative",
}));

const Info = styled("div")(({ theme, ...props }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Title = styled("h1")(({ theme, ...props }) => ({
  color: "white",
  marginBottom: "20px",
}));

const Button = styled("button")(({ theme, ...props }) => ({
  border: "none",
  padding: "10px",
  backgroundColor: "white",
  color: "gray",
  cursor: "pointer",
  fontWeight: "600",
}));

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image
        alt={item}
        src={`${
          item === "women's clothing"
            ? "/images/women.jpeg"
            : item === "men's clothing"
            ? "/images/men.jpg"
            : item === "electronics"
            ? "/images/electronics.webp"
            : "/images/jewelery.jpg"
        }`}
        layout="fill"
        objectFit="cover"
      />
      <Info>
        <Title>{item}</Title>
        <Link href={`/productList/${item}`}>
          <Button>SHOP NOW</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;
