import { useLanguage } from "hooks";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const ComponentToPrint = React.forwardRef((props, ref) => {
  const language = useLanguage();
  return (
    <section ref={ref}>
      <Container>
        <Row className="text-right p-4">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <p>{language.tableDate}</p>
            <p>{props.date}</p>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <span>{language.tableProduct}</span>
            <span>{props.name}</span>
          </Col>
        </Row>
      </Container>
    </section>
  );
});

export default ComponentToPrint;
