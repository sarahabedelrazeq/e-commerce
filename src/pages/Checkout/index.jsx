import React from "react";
import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { useLanguage } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, deleteCartItem, getCartItems } from "store/user";
import { NoData, Skeleton } from "components";
import { STORAGE_URL } from "constants";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Checkout() {
  const dispatch = useDispatch();
  const language = useLanguage();
  const DataContent = useSelector((state) => state.user.cart);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const onDelete = (id) => {
    dispatch(deleteCartItem({ id }));
  };
  React.useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);
  React.useEffect(() => {
    let totalPrice = 0;
    if (DataContent.fullData) {
      DataContent.fullData.forEach((item) => {
        totalPrice +=
          parseFloat(item.item.sell_price) > 0
            ? parseFloat(item.item.sell_price) * item.qty
            : item.price +
              item.item.direct_charge_app_commission +
              item.item.direct_charge_salesman_commission;
      });
      setTotalPrice(totalPrice);
    }
  }, [DataContent]);

  return (
    <div id="Checkout-page" className="page-container">
      <section id="Checkout">
        <Container>
          <Row>
            <Col xl={12} lg={12} md={12} xs={12} className="mb-4">
              <h4 className="fw-bold">{language.checkout}</h4>
            </Col>

            <Col xl={8} lg={8} md={12} xs={12} className="mb-5 mb-lg-0">
              <Row>
                <Col xs={12}>
                  <p>{language.choseCheckoutMethod}</p>
                </Col>
                <Col xs={12}>
                  <Row>
                    <Col xs={6} sm={4}>
                      <button
                        className="btn bg-white rounded-3 p-4 d-block w-100"
                        onClick={() => {
                          Swal.fire({
                            title: language.thisServiceIsUnavailableNow,
                            showCancelButton: false,
                            confirmButtonText: language.ok,
                            cancelButtonText: language.cancel,
                            confirmButtonColor: "#0063f7",
                            cancelButtonColor: "#900",
                          });
                        }}
                      >
                        <img
                          src="/images/Visa-logo.svg"
                          alt="Visa"
                          className="w-100 contain checkout-type-card"
                        />
                      </button>
                    </Col>
                    <Col xs={6} sm={4}>
                      <button
                        className="btn bg-white rounded-3 p-4 d-block w-100"
                        onClick={() => {
                          Swal.fire({
                            title: language.thisServiceIsUnavailableNow,
                            showCancelButton: false,
                            confirmButtonText: language.ok,
                            cancelButtonText: language.cancel,
                            confirmButtonColor: "#0063f7",
                            cancelButtonColor: "#900",
                          });
                        }}
                      >
                        <img
                          src="/images/wallet.png"
                          alt="Visa"
                          className="w-100 contain checkout-type-card"
                        />
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            {DataContent.fullData && DataContent.fullData.length > 0 && (
              <Col xl={4} lg={4} md={12} xs={12}>
                <div className="bg-white rounded-4 px-5 py-4">
                  <Row>
                    <Col xl={12} lg={12} md={12} xs={12}>
                      <h5 className="text-primary fw-bold">
                        {language.purchases}
                      </h5>
                      <hr></hr>
                    </Col>

                    {DataContent.fullData?.map((item, index) => (
                      <Col xl={12} lg={12} md={12} xs={12} key={index}>
                        <Row>
                          <Col xl={9} lg={8} md={8} xs={8}>
                            <h4 className="text-light5">{item.item?.name}</h4>
                          </Col>
                          <Col xl={3} lg={4} md={4} xs={4}>
                            <p className="text-light5 fw-bold">
                              {parseFloat(item.item.sell_price) > 0
                                ? (
                                    parseFloat(item.item.sell_price) * item.qty
                                  ).toFixed(2)
                                : (
                                    item.price +
                                    item.item.direct_charge_app_commission +
                                    item.item.direct_charge_salesman_commission
                                  ).toFixed(2)}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                    <Col xl={12} lg={12} md={12} xs={12}>
                      <hr></hr>
                    </Col>

                    <Col xl={12} lg={12} md={12} xs={12}>
                      <Row>
                        <Col xl={8} lg={8} md={8} xs={8}>
                          <h5 className="text-primary fw-bold">
                            {language.totalAmount}
                          </h5>
                        </Col>
                        <Col xl={4} lg={4} md={4} xs={4} className="mb-4">
                          <p className="h4 text-light5 fw-bold ">
                            {totalPrice.toFixed(2)}
                          </p>
                        </Col>
                        {/* <Col>
                          <Link
                            to="/checkout"
                            className="w-100 fw-bold btn btn-primary"
                          >
                            {language.placeOrder}
                          </Link>
                        </Col> */}
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
}
