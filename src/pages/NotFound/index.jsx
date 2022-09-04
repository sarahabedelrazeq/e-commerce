import { Row, Col, Button, Container, Image } from "react-bootstrap";
import React from "react";
import { useLanguage } from "hooks";

export default function NotFound() {
  const language = useLanguage();

  return (
    <div className="page-container">
      <section id="notFound">
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <h1>404</h1>
            </Col>
            <Col xs={12} className="mt-1 text-center">
              <h5>{language.notFound}</h5>
            </Col>
            <Col xs={12} className="mt-5 text-center">
              <Image src="/images/MainSection/not-found-page.png" className="w-50 rounded" />
            </Col>
            <Col xs={12} className="mt-5 text-center">
              <Button href="/" variant="primary" className="mt-3">
                {language.backToHomePage}
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
