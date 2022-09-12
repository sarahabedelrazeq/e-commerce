import { Send } from "@mui/icons-material";
import { styled } from "@mui/material";

const Container = styled("div")(({ theme, ...props }) => ({
  height: "60vh",
  backgroundColor: "#fcf5f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

const Title = styled("h1")(({ theme, ...props }) => ({
  fontSize: "70px",
  marginBottom: "20px",
}));

const Desc = styled("div")(({ theme, ...props }) => ({
  fontSize: "24px",
  fontWeight: "300",
  marginBottom: "20px",
}));

const InputContainer = styled("div")(({ theme, ...props }) => ({
  width: "50%",
  height: "40px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "spaceBetween",
  border: "1px solid lightgray",
}));

const Input = styled("input")(({ theme, ...props }) => ({
  border: "none",
  flex: "8",
  paddingLeft: "20px",
}));

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <button className="btn btn-teal rounded-0">
          <Send />
        </button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
