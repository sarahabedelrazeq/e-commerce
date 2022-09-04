import React from "react";
import { Skeleton, Carousel } from "components";
import { Col, Container, Row } from "react-bootstrap";

/* Home - page  */
export default function Hero({ loading, items }) {
  return (
    <div>
      <Container className="slider--container" direction="next">
        {loading ? (
          <Row>
            <Col xs={12}>
              <Skeleton count={1} width="100%" height={350} />
            </Col>
          </Row>
        ) : (
          <Carousel dataContent={items} />
        )}
      </Container>
    </div>
  );
}
