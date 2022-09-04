import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFetch } from "hooks";
import { Skeleton, NoData } from "components";

export default function PublicPage() {
  const { machine_name } = useParams();
  const [pageResponse, refetch] = useFetch(
    `general/get-app-info-details`,
    "GET"
  );

  React.useEffect(() => {
    refetch(null, `?machine_name=${machine_name}`);
  }, [refetch, machine_name]);

  return (
    <div className="page-container">
      <section id="publicPage">
        <Container>
          {pageResponse.loading ? (
            <Row>
              <Col xs={12} className="mb-4 mb-md-5">
                <Skeleton count={1} width="60%" height={60} />
              </Col>
              <Col xs={12} className="mb-4 mb-md-5 gallery-skeleton-col">
                <Skeleton count={1} width="100%" height={200} />
              </Col>
              <Col xs={12} className="mb-4 mb-md-5 gallery-skeleton-col">
                <Skeleton count={1} width="100%" height={300} />
              </Col>
            </Row>
          ) : pageResponse.result.data ? (
            <>
              <Row className="mb-4 mb-md-5">
                <Col xs={12}>
                  <h2>{pageResponse.result.data.name}</h2>
                </Col>
              </Row>

              <Row className="position-relative">
                <Col xl={12} lg={12} md={12} xs={12} className="">
                  <div
                    className="publicPage--textarea"
                    dangerouslySetInnerHTML={{
                      __html: pageResponse.result.data.text,
                    }}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <NoData />
          )}
        </Container>
      </section>
    </div>
  );
}
