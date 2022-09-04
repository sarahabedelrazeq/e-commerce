import React from "react";
import { Col, Row } from "react-bootstrap";
import { Skeleton, WishlistCard, NoData } from "components";
import { useLanguage } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorites, getFavorites } from "store/user";
import { ProfileLayout } from "components/layouts";

export default function Wishlist() {
  const language = useLanguage();
  const dispatch = useDispatch();
  const DataContent = useSelector((state) => state.user.favorites);

  const onDelete = (id) => {
    dispatch(deleteFavorites(id));
  };
  React.useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  return (
    <ProfileLayout id="wishlist-page">
      <Row id="wishlist">
        <Col xs={12} className="mb-4 mb-md-5">
          <h3>{language.theWishlist}</h3>
        </Col>
        <Col xs={12}>
          {DataContent.loading ? (
            <Row>
              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="justify-content-start pt-2 align-items-center"
              >
                <Skeleton
                  count={1}
                  width="100%"
                  height={120}
                  // className="mb-4"
                />
              </Col>
              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="justify-content-start pt-2 align-items-center"
              >
                <Skeleton
                  count={1}
                  width="100%"
                  height={120}
                  // className="mb-4"
                />
              </Col>
              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="justify-content-start pt-2 align-items-center"
              >
                <Skeleton
                  count={1}
                  width="100%"
                  height={120}
                  // className="mb-4"
                />
              </Col>
            </Row>
          ) : DataContent.fullData && DataContent.fullData.length > 0 ? (
            DataContent.fullData.map((item, index) => (
              <WishlistCard onDelete={onDelete} key={index} {...item} />
            ))
          ) : (
            <NoData />
          )}
        </Col>
      </Row>
    </ProfileLayout>
  );
}
