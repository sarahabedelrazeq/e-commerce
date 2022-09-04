import React from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import { Gallery, GallerySkeleton } from "components";
import { useFetch, useLanguage } from "hooks";
import { useLocation } from "react-router-dom";
import qs from "qs";

export default function SearchResults() {
  const language = useLanguage();
  const { search } = useLocation();
  const [itemResponse, itemRequest] = useFetch(`/user/search-item${search}`);
  React.useEffect(() => {
    if (search) itemRequest(null);
  }, [itemRequest, search]);

  const searchedItems = ("search-item" + search).slice(16);

  return (
    <div id="search-results" className="page-container">
      <section id="searchResults">
        <Container>
          <Row className="position-relative">
            {/* Item image */}
            <Col xs={12} className="mb-4 mb-md-5">
              <h2 className="mt-4 searchResults-title">
                {language.searchResults}{" "}
                {Object.keys(qs.parse(searchedItems))[0]}
              </h2>
            </Col>
            <Col xs={12} className="searchResults--gallery pt-1">
              {itemResponse.loading ? (
                <GallerySkeleton />
              ) : (
                <Gallery
                  data={itemResponse.result.data}
                  meta={itemResponse.result.meta}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
