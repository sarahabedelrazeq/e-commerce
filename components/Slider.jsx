import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { styled } from "@mui/material";
import { useState } from "react";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled("div")(({ theme, ...props }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  position: "relative",
  overflow: "hidden",
}));

const Arrow = styled("div")(({ theme, ...props }) => ({
  width: "50px",
  height: "50px",
  backgroundColor: "#fff7f7",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "0",
  bottom: "0",
  left: `${props.direction === "left" && "10px"}`,
  right: `${props.direction === "right" && "10px"}`,
  margin: "auto",
  cursor: "pointer",
  opacity: "0.5",
  zIndex: "2",
}));

const Wrapper = styled("div")(({ theme, ...props }) => ({
  height: "100%",
  display: "flex",
  transition: "all 1.5s ease",
  transform: `translateX(${props.slideIndex * -100}vw)`,
}));

const Slide = styled("div")(({ theme, ...props }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  backgroundColor: `#${props.bg},`
}));

const ImgContainer = styled("div")(({ theme, ...props }) => ({
  height: "100%",
  flex: "1",
}));

const Image = styled("img")(({ theme, ...props }) => ({
  height: "80%",
}));

const InfoContainer = styled("div")(({ theme, ...props }) => ({
  flex: "1",
  padding: "50px",
}));

const Title = styled("h1")(({ theme, ...props }) => ({
  fontSize: "70px",
}));

const Desc = styled("p")(({ theme, ...props }) => ({
  margin: "50px 0px",
  fontSize: "20px",
  fontWeight: "500",
  letterSpacing: "3px",
}));

const Button = styled("button")(({ theme, ...props }) => ({
  padding: "10px",
  fontSize: "20px",
  backgroundColor: "transparent",
  cursor: "pointer",
}));

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex} test="red">
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
