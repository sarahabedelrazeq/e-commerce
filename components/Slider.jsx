import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { Button, Container, Grid, styled } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

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
  display: "flex",
  transition: "all 1.5s ease",
  transform: `translateX(${props.slideIndex * -100}vw)`,
}));

const Slide = styled("div")(({ theme, ...props }) => ({
  width: "100vw",
  minWidth: "100vw",
  maxWidth: "100vw",
  height: "100vh",
  backgroundColor: `#${props.bg},`,
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
    <div>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex} test="red">
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <Container className="h-100">
              <Grid spacing={2} container alignItems="center" className="h-100">
                <Grid item xs={6} className="h-100">
                  <img src={item.img} alt={item.title} className="w-100 h-100" width="100%" height="100%" />
                </Grid>
                <Grid item xs={6}>
                  <h1 className="mb-3">{item.title}</h1>
                  <p className="mb-3">{item.desc}</p>
                  <Button variant="contained">SHOW NOW</Button>
                </Grid>
              </Grid>
            </Container>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </div>
  );
};

export default Slider;
