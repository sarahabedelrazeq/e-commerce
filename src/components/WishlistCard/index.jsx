import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useLanguage } from "hooks";
import { STORAGE_URL } from "constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function WishlistCard(props) {
  const language = useLanguage();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="mt-3 bg-light rounded-3 WishlistCards--box p-3">
      <Row className="align-items-center">
        <Col xl={3} lg={3} md={3} sm={3} xs={4} className="mb-3 mb-sm-0">
          <Link to={`/product/${props.id}`}>
            <Image
              style={{ height: "85px", width: "85px" }}
              className="mw-100 rounded-3"
              role="button"
              src={`${STORAGE_URL}/${props.image}`}
            />
          </Link>
        </Col>
        {/* Item title */}
        <Col xl={7} lg={7} md={6} sm={6} xs={6} className="mb-3 mb-sm-0">
          <Link to={`/product/${props.id}`}>
            <Row>
              <Col sm={9} xs={12}>
                <h6 className="text-dark" role="button">
                  {props.name}
                </h6>
              </Col>
              <Col sm={3} xs={12}>
                <p className="h9 m-0 pb-2" role="button">
                  {language.price}
                </p>
                <h6 className="fw-bold text-dark m-0" role="button">
                  {props?.sell_price} {user?.place_parent?.currency}
                </h6>
              </Col>
            </Row>
          </Link>
        </Col>
        <Col
          xl={2}
          lg={1}
          md={2}
          sm={2}
          xs={2}
          className="WishlistCards--div-icons mb-3 mb-sm-0"
        >
          <Image
            onClick={() => props.onDelete(props)}
            role="button"
            src="/images/Wishlist/wishlist-trash.svg"
          />
        </Col>
      </Row>
    </div>
  );
}
