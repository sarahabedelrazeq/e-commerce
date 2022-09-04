import React from "react";
import { Col, Row } from "react-bootstrap";
import {Skeleton} from "components";

/* Main Gallery component that accept data to view as gallery */
export default function GallerySkeleton({ xs, sm, md, lg, xl, xxl }) {
  return (
    <Row>
      <Col
        xs={xs ? xs : 6}
        sm={sm ? sm : 6}
        md={md ? md : 4}
        lg={lg ? lg : 3}
        xl={xl ? xl : 3}
        xxl={xxl ? xxl : 2}
        className="mb-4 mb-md-5 "
      >
        <div className="gallery-skeleton-col">
          <Skeleton
            count={1}
            width="100%"
            height="100%"
            className="d-block h-100"
          />
        </div>
        <div>
          <Skeleton
            count={1}
            width="100%"
            height="24"
            className="mt-3 mb-2 d-block"
          />
        </div>
      </Col>
      <Col
        xs={xs ? xs : 6}
        sm={sm ? sm : 6}
        md={md ? md : 4}
        lg={lg ? lg : 3}
        xl={xl ? xl : 3}
        xxl={xxl ? xxl : 2}
        className="mb-4 mb-md-5 "
      >
        <div className="gallery-skeleton-col">
          <Skeleton
            count={1}
            width="100%"
            height="100%"
            className="d-block h-100"
          />
        </div>
        <div>
          <Skeleton
            count={1}
            width="100%"
            height="24"
            className="mt-3 mb-2 d-block"
          />
        </div>
      </Col>
      <Col
        xs={xs ? xs : 6}
        sm={sm ? sm : 6}
        md={md ? md : 4}
        lg={lg ? lg : 3}
        xl={xl ? xl : 3}
        xxl={xxl ? xxl : 2}
        className="mb-4 mb-md-5 "
      >
        <div className="gallery-skeleton-col">
          <Skeleton
            count={1}
            width="100%"
            height="100%"
            className="d-block h-100"
          />
        </div>
        <div>
          <Skeleton
            count={1}
            width="100%"
            height="24"
            className="mt-3 mb-2 d-block"
          />
        </div>
      </Col>
      <Col
        xs={xs ? xs : 6}
        sm={sm ? sm : 6}
        md={md ? md : 4}
        lg={lg ? lg : 3}
        xl={xl ? xl : 3}
        xxl={xxl ? xxl : 2}
        className="mb-4 mb-md-5 "
      >
        <div className="gallery-skeleton-col">
          <Skeleton
            count={1}
            width="100%"
            height="100%"
            className="d-block h-100"
          />
        </div>
        <div>
          <Skeleton
            count={1}
            width="100%"
            height="24"
            className="mt-3 mb-2 d-block"
          />
        </div>
      </Col>
    </Row>
  );
}
