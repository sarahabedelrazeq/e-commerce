import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useLanguage } from "hooks";

export default function NoData({ text }) {
  const language = useLanguage();

  return (
    <div>
      <Row className="justify-content-center">
        <Col xl={4} lg={4} md={5} sm={6} xs={12}>
          <Image className="pt-4 w-100" src="/images/MainSection/no-data-found.png" />
        </Col>
        <Col xs={12} className="text-center mt-4 mt-lg-5 ">
          <h2>{text ? text : language.noData}</h2>
        </Col>
      </Row>
    </div>
  );
}
