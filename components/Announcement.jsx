import Container from "./Container";

const Announcement = () => {
  return (
    <div className="bg-primary">
      <Container>
        <p
          className="fs-6 text-white text-center d-flex align-items-center justify-content-center py-2"
        >
          Super Deal! Free Shipping on Orders Over $50
        </p>
      </Container>
    </div>
  );
};

export default Announcement;
