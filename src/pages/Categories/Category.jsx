import React from "react";
import { Gallery, Skeleton, GallerySkeleton } from "components";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { useFetch, usePagination } from "hooks";

const Category = () => {
  const { category_id } = useParams();
  const { page } = usePagination();
  const [subCategoryResponse, subCategoryRequest] =
    useFetch("agent/get-category");
  const [categoryInfoResponse, categoryInfoRequest] = useFetch(
    "agent/get-category-info"
  );

  React.useEffect(() => {
    subCategoryRequest(null, `?parent_id=${category_id}&page=${page}`);
  }, [subCategoryRequest, category_id, page]);

  React.useEffect(() => {
    categoryInfoRequest(null, `?category_id=${category_id}`);
  }, [categoryInfoRequest, category_id]);

  return (
    <div id="Category-page" className="pt-5 page-container">
      <section>
        <Container>
          {/* Hero Image - {start}  */}
          <Row>
            <Col xl={12} lg={12} md={12} xs={12}>
              {categoryInfoResponse.loading ? (
                <Row>
                  <Col xl={12} lg={12} md={12} xs={12}>
                    <Skeleton
                      count={1}
                      width="100%"
                      height={60}
                      className="categories-skeleton-mobile"
                    />
                  </Col>
                </Row>
              ) : (
                <div className="category_heroImage_container">
                  <div className="parallelogram">
                    <div className="text-white m-0 category_heroImage_title bg-info">
                      <h1 className="px-3 h3">
                        {categoryInfoResponse.result.data?.name}
                      </h1>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          {subCategoryResponse.loading ? (
            <GallerySkeleton />
          ) : (
            <Gallery
              data={subCategoryResponse.result.data}
              meta={subCategoryResponse.result.meta}
              category
            />
          )}
        </Container>
      </section>
    </div>
  );
};

export default Category;
