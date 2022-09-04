import React from "react";
import { useParams } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import { useFetch, useLanguage } from "hooks";
import { Gallery, Skeleton, NoData, GallerySkeleton } from "components";

import ProductShow from "./ProductShow";

/* Add to cart without print - page  */
export default function ProductDetails() {
  const { product_id } = useParams();
  const language = useLanguage();
  const data = language.similarOffers;
  const [itemResponse, itemRequest] = useFetch("user/get-item-info");
  const [categoryInfoResponse, categoryInfoRequest] = useFetch(
    "user/get-item-related"
  );

  React.useEffect(() => {
    itemRequest(null, `?item_id=${product_id}`);
  }, [itemRequest, product_id]);

  React.useEffect(() => {
    categoryInfoRequest(null, `?item_id=${product_id}`);
  }, [categoryInfoRequest, product_id]);

  return (
    <div id="product-page" className="page-container">
      <section id="productDetails">
        <Container>
          {itemResponse.loading ? (
            <Row>
              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="justify-content-start mb-4 align-items-center"
              >
                <Skeleton
                  count={1}
                  width="100%"
                  height={200}
                  className="mb-4"
                />
              </Col>
            </Row>
          ) : itemResponse.result.data ? (
            <ProductShow data={itemResponse.result.data} />
          ) : (
            <NoData />
          )}
        </Container>
      </section>
      <hr />
      <section id="similar-offers" className="pt-4 pt-lg-5">
        <Container>
          {categoryInfoResponse.loading ? (
            <Row>
              <Col xl={4} lg={4} md={4} xs={4}>
                <Skeleton
                  count={1}
                  width="100%"
                  height={50}
                  className="mb-4 mb-md-5"
                />
              </Col>
            </Row>
          ) : (
            categoryInfoResponse.result.data && (
              <Row>
                <Col xs={12} id="SectionTitle" className="mb-4 mb-md-5">
                  <h2 className="text-dark">{data}</h2>
                </Col>
              </Row>
            )
          )}

          {categoryInfoResponse.loading ? (
            <GallerySkeleton />
          ) : (
            categoryInfoResponse.result.data && (
              <Gallery data={categoryInfoResponse.result.data} />
            )
          )}
        </Container>
      </section>
    </div>
  );
}
