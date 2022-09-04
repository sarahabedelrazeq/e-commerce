import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useLanguage } from "hooks";

export default function Terms() {
  const language = useLanguage();

  return (
    <section id="terms">
      <Container>
        <h2 className="mt-2 mb-4">{language.termsAndConditions}</h2>
        {[].map((item, index) => (
          <Row
            className="mt-0 mt-xl-3 mt-lg-3 mt-md-3 position-relative"
            key={index}
          >
            {/* Item Text Area */}
            <Col xl={12} lg={12} md={12} xs={12}>
              <h4 className="terms--textarea">{item.textarea}</h4>
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
}
