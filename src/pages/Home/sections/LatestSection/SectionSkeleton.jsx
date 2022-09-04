import React from "react";
import { Col, Row } from "react-bootstrap";
import { Skeleton } from "components";

const SectionSkeleton = () => (
  <Row className="mb-5">
    <Col
      xl={4}
      lg={4}
      md={4}
      xs={12}
      className="justify-content-start mb-4 align-items-center"
    >
      <Skeleton count={1} width="100%" height={60} />
    </Col>
    <Col xl={12} lg={12} md={12} xs={12} className="h-100">
      <Row className="justify-content-between">
        <Col
          xxl={2}
          xl={3}
          lg={4}
          md={4}
          sm={6}
          xs={6}
        >
          <div className="slider-skeleton">
            <Skeleton count={1} width="100%" height="100%" />
          </div>
        </Col>
        <Col
          xxl={2}
          xl={3}
          lg={4}
          md={4}
          sm={6}
          xs={6}
          className="d-none d-md-block"
        >
          <div className="slider-skeleton">
            <Skeleton count={1} width="100%" height="100%" />
          </div>
        </Col>
        <Col
          xxl={2}
          xl={3}
          lg={4}
          md={4}
          sm={6}
          xs={6}
          className="d-none d-xl-block"
        >
          <div className="slider-skeleton">
            <Skeleton count={1} width="100%" height="100%" />
          </div>
        </Col>
        <Col
          xxl={2}
          xl={3}
          lg={4}
          md={4}
          sm={6}
          xs={6}
          className="d-none d-xxl-block"
        >
          <div className="slider-skeleton">
            <Skeleton count={1} width="100%" height="100%" />
          </div>
        </Col>
        <Col
          xxl={2}
          xl={3}
          lg={4}
          md={4}
          sm={6}
          xs={6}
          className="mb-4 mb-md-5"
        >
          <div className="slider-skeleton">
            <Skeleton count={1} width="100%" height="100%" />
          </div>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default SectionSkeleton;
