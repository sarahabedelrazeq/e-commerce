import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material";
import Link from "next/link";

const Info = styled("div")(({ theme, ...props }) => ({
  opacity: 0,
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.5s ease",
  cursor: "pointer",
}));

const Container = styled("div")(({ theme, ...props }) => ({
  flex: 1,
  margin: "5px",
  height: "350px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  position: "relative",
  "&:hover .Info": {
    opacity: 1,
  },
}));
const Image = styled("img")(({ theme, ...props }) => ({
  height: "350px",
  width: "100%",
  objectFit: "contain",
  zIndex: 2,
}));
const Icon = styled("div")(({ theme, ...props }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "10px",
  transition: "all 0.5s ease",
  "&:hover": {
    backgroundColor: "#e9f5f5",
    transform: "scale(1.1)",
  },
}));

const Product = ({ item }) => {
  return (
    <Container>
      <Image src={item.image} />
      <Info className="Info">
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link href={`/product/${item.id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
