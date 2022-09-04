import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Card({ link, image, text, className }) {
  return (
    <div>
      <Row>
        <Col xs={12} className="d-flex justify-content-center">
          <NavLink
            to={link}
            className={`${className} d-block bg-light rounded-3`}
          >
            <Image
              loading="lazy"
              className="rounded-3 b-block w-100 h-100"
              src={image}
            />
          </NavLink>
        </Col>
        <Col>
          <h5 className="text-info mt-3 text-center">{text}</h5>
        </Col>
      </Row>
    </div>
  );
}
