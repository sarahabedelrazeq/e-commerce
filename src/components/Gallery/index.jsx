import React from "react";
import { Col, Row } from "react-bootstrap";
import PaginationSection from "../PaginationSection";
import { STORAGE_URL } from "constants";
import {Card, NoData} from "components";

export default function Gallery({
  data,
  meta,
  category,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}) {
  return (
    <>
      <Row className="gallery-row">
        {data && data.length !== 0 ? (
          data.map((item, index) => (
            <Col
              key={index}
              xs={xs ? xs : 6}
              sm={sm ? sm : 6}
              md={md ? md : 4}
              lg={lg ? lg : 3}
              xl={xl ? xl : 3}
              xxl={xxl ? xxl : 2}
              className="mb-4 mb-md-5 text-center"
            >
              <Card
                image={STORAGE_URL + item.image}
                link={`${
                  !category
                    ? `/product/${item.id}`
                    : item.have_child
                    ? `/category/${item.id}`
                    : `/sub_category/${item.id}`
                }`}
                text={item.name}
                className="categories--image-padd"
              />
            </Col>
          ))
        ) : (
          <NoData />
        )}
      </Row>
      <Row className="justify-content-center mt-5">
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="mt-3 mt-xl-5 mt-lg-5 mt-md-5"
        >
          {meta && (
            <PaginationSection count={meta.total} perPage={meta.per_page} />
          )}
        </Col>
      </Row>
    </>
  );
}
