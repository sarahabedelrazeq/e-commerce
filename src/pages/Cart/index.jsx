import React from "react";
import { Container, Col, Row, Image, Button } from "react-bootstrap";
import { useLanguage } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, deleteCartItem, getCartItems } from "store/user";
import { NoData, Skeleton } from "components";
import { STORAGE_URL } from "constants";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const language = useLanguage();
  const DataContent = useSelector((state) => state.user.cart);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

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

  const changeCart = (qty, item) => {
    setLoading(true);
    dispatch(
      addCartItem({
        item_id: item?.item?.id,
        qty: qty > 1 ? qty : 1,
        type: item.item?.category_type,
        description: item.item?.description || "",
        price: item.price,
      })
    ).then(() => {
      setLoading(false);
      dispatch(getCartItems());
    });
  };

  return (
    <div id="Checkout-page" className="page-container">
      <section id="Checkout">
        <Container>
          <Row>
            <Col lg={8} xs={12} className="mb-4">
              <Row>
                <Col xs={6}>
                  <h4 className="fw-bold">{language.shoppingCart}</h4>
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                  <Button variant="link">{language.clearCart}</Button>
                </Col>
              </Row>
            </Col>

            <Col xl={8} lg={8} md={12} xs={12} className="mb-5 mb-lg-0">
              {DataContent.loading || loading ? (
                <Row>
                  <Col
                    xl={12}
                    lg={12}
                    md={12}
                    xs={12}
                    className="justify-content-start pt-2 align-items-center"
                  >
                    <Skeleton count={1} width="100%" height={120} />
                  </Col>
                  <Col
                    xl={12}
                    lg={12}
                    md={12}
                    xs={12}
                    className="justify-content-start pt-2 align-items-center"
                  >
                    <Skeleton count={1} width="100%" height={120} />
                  </Col>
                  <Col
                    xl={12}
                    lg={12}
                    md={12}
                    xs={12}
                    className="justify-content-start pt-2 align-items-center"
                  >
                    <Skeleton count={1} width="100%" height={120} />
                  </Col>
                </Row>
              ) : DataContent.fullData && DataContent.fullData.length > 0 ? (
                <div>
                  {DataContent.fullData.map((item, index) => (
                    <div className="bg-white rounded-3 mb-2" key={index}>
                      <Row className="p-2 p-sm-4 justify-content-between gx-1 gx-sm-4">
                        <Col
                          xl={2}
                          lg={2}
                          md={2}
                          xs={4}
                          className="text-center"
                        >
                          <Link to={`/product/${item.item?.id}`}>
                            <Image
                              src={STORAGE_URL + item?.item?.image}
                              className="mw-100"
                            />
                          </Link>
                        </Col>
                        <Col xl={10} lg={10} md={10} xs={8}>
                          <Row>
                            <Col
                              xl={5}
                              lg={5}
                              md={5}
                              xs={10}
                              className="mb-sm-4 mb-md-0 text-center"
                            >
                              <h5>{item.item?.name}</h5>
                            </Col>
                            <Col
                              xl={1}
                              lg={1}
                              md={1}
                              xs={2}
                              className="mb-sm-4 mb-md-0 text-center d-md-none"
                            >
                              <Image
                                onClick={() => {
                                  onDelete(item.id);
                                }}
                                src="/images/Checkout/checkout-delete.svg"
                                role="button"
                              />
                            </Col>
                            <Col
                              xl={3}
                              lg={3}
                              md={3}
                              xs={7}
                              className="mb-sm-4 mb-md-0 text-center"
                            >
                              {item.item?.category_type === 1 && (
                                <Row className=" gx-1 gx-sm-4">
                                  <Col xl={12} lg={12} md={12} xs={12}>
                                    <p className="text-primary mb-0 mb-sm-2">
                                      {language.quantity}
                                    </p>

                                    <div className="rounded-2 bg-white border">
                                      <Row className="align-items-center gx-1 gx-sm-4">
                                        <Col xs={4}>
                                          <button
                                            onClick={() =>
                                              changeCart(item.qty - 1, item)
                                            }
                                            className="w-100 border-0 bg-transparent p-0 text-center"
                                          >
                                            -
                                          </button>
                                        </Col>
                                        <Col xs={4}>
                                          <input
                                            defaultValue={item.qty}
                                            className="w-100 form-control border-0 bg-transparent py-sm-2 px-0 text-center"
                                            onBlur={(event) => {
                                              let quantity = parseInt(
                                                event.target.value
                                              );

                                              if (quantity)
                                                changeCart(quantity, item);
                                            }}
                                          />
                                        </Col>
                                        <Col xs={4}>
                                          <button
                                            onClick={() =>
                                              changeCart(item.qty + 1, item)
                                            }
                                            className="w-100 border-0 bg-transparent p-0 text-center"
                                          >
                                            +
                                          </button>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Col>
                                </Row>
                              )}
                            </Col>
                            <Col
                              xl={2}
                              lg={2}
                              md={2}
                              xs={5}
                              className="mb-sm-4 mb-md-0 text-center"
                            >
                              <Row>
                                {/* item - price */}
                                <Col xl={12} lg={12} md={12} xs={12}>
                                  <p className="text-primary mb-0 mb-sm-2">
                                    {language.price}
                                  </p>
                                </Col>
                                <Col xl={12} lg={12} md={12} xs={12}>
                                  <p>
                                    {parseFloat(item.item.sell_price) > 0
                                      ? (
                                          parseFloat(item.item.sell_price) *
                                          item.qty
                                        ).toFixed(3)
                                      : (
                                          item.price +
                                          item.item
                                            .direct_charge_app_commission +
                                          item.item
                                            .direct_charge_salesman_commission
                                        ).toFixed(3)}
                                  </p>
                                </Col>
                              </Row>
                            </Col>
                            <Col
                              xl={1}
                              lg={1}
                              md={1}
                              xs={1}
                              className="mb-sm-4 mb-md-0 text-center d-none d-md-block"
                            >
                              <Image
                                onClick={() => {
                                  onDelete(item.id);
                                }}
                                src="/images/Checkout/checkout-delete.svg"
                                role="button"
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              ) : (
                <NoData />
              )}
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
                                  ).toFixed(3)
                                : (
                                    item.price +
                                    item.item.direct_charge_app_commission +
                                    item.item.direct_charge_salesman_commission
                                  ).toFixed(3)}
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
                            {totalPrice.toFixed(3)}
                          </p>
                        </Col>
                        <Col>
                          <Link
                            to="/checkout"
                            className="w-100 fw-bold btn btn-primary"
                          >
                            {language.placeOrder}
                          </Link>
                        </Col>
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
