import styled from "styled-components";
import { mobile } from "../responsive";
import Image from "next/image";
import Link from "next/link";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 50vh;
  position: relative;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  max-
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image alt={item} src="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" layout="fill" objectFit="cover" />
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
