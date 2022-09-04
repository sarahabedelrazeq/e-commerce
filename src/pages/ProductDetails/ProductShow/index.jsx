import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Image, Button, Alert } from "react-bootstrap";
import { STORAGE_URL } from "constants";
import { useFetch, useLanguage, useToggle } from "hooks";
import { Icons } from "components";
import { addCartItem, addFavorites, deleteFavorites } from "store/user";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { setUserBalance } from "store/auth";
import { useReactToPrint } from "react-to-print";
import { Oval } from "react-loader-spinner";
import { ComponentToPrintOrderDetails } from "components/PrintComponent";

export default function ProductShow(props) {
  const { product_id } = useParams();
  const language = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = React.useState(1);
  const [errors, setErrors] = React.useState({});
  const [print, setPrint] = React.useState(false);
  const [favorite, setFavorite] = React.useState(props.data.favorite);
  const [priceValue, setPriceValue] = React.useState(0);
  const [saveOrderData, setSaveOrderData] = React.useState(null);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useToggle();
  const description = React.useRef(null);
  const price = React.useRef(null);
  let componentRef = React.useRef();
  const { categoryTypes } = useSelector((state) => state.app);

  const [buyResponse, buyRequest] = useFetch("agent/buy-now", "POST");
  const [dataResponse, dataRequest] = useFetch("agent/get-order-details");
  const [addToCartResponse, addToCartRequest] = useFetch(
    "user/add-cart-item",
    "POST"
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => navigate(`/my-orders-details/${saveOrderData}`),
  });

  const DataOrderDetails = dataResponse.result.data;

  React.useEffect(() => {
    if (print && DataOrderDetails && DataOrderDetails.id) {
      handlePrint();
      setPrint();
    }
  }, [DataOrderDetails, print, handlePrint]);

  const goToLogin = () => {
    Swal.fire({
      title: language.goToLogin,
      showCancelButton: true,
      confirmButtonText: language.login,
      cancelButtonText: language.cancel,
      confirmButtonColor: "#0063f7",
      cancelButtonColor: "#900",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  const buy = (print = false) => {
    if (isLoggedIn) {
      setLoading();
      buyRequest(
        {
          item_id: product_id,
          source: "web",
          qty: count,
          type: props.data.category_type,
          price: props.data.sell_price,
        },
        null,
        (_, title) => {
          setLoading();
          onSuccess(_, title, print);
        },
        onError
      );
    } else goToLogin();
  };

  const buyWithSendHandler = () => {
    let newErrors = {};
    if (isLoggedIn) {
      if (description?.current?.value == "") {
        newErrors = { ...newErrors, description: language.thisFieldIsRequired };
      }
      if (toNumber(props.data?.sell_price) == 0 && toNumber(priceValue) == 0) {
        newErrors = { ...newErrors, price: language.thisFieldIsRequired };
      }
      if (
        description?.current?.value != "" &&
        !(toNumber(props.data?.sell_price) == 0 && toNumber(priceValue) == 0)
      ) {
        setLoading();

        buyRequest(
          {
            item_id: product_id,
            qty: 1,
            type: props.data.category_type,
            source: "web",
            description: description.current.value,
            price:
              props.data?.category_type === 1
                ? props.data.sell_price
                : priceValue,
          },
          null,
          (_, title) => {
            setLoading();
            onSuccess(_, title);
          },
          onError
        );
      }
    } else goToLogin();

    setErrors(newErrors);
  };

  const handleAddToFavorite = () => {
    if (isLoggedIn) {
      if (favorite) dispatch(deleteFavorites(props.data));
      else dispatch(addFavorites(props.data));
      setFavorite(!favorite);
    } else goToLogin();
  };

  const minusButtonHandler = () => {
    if (count <= 1) {
      return;
    } else {
      setCount(count - 1);
    }
  };

  const plusButtonHandler = () => {
    if (count < 100) {
      setCount(count + 1);
    } else {
      return;
    }
  };

  const handleFocus = (event) => event.target.select();

  const onSuccess = (_, title, print = false) => {
    setSaveOrderData(_.data.order_id);
    if (print === true) {
      setPrint(true);
      dataRequest(null, `?order_id=${_.data.order_id}`);
    } else {
      navigate(`/my-orders-details/${_.data.order_id}`);
    }

    dispatch(setUserBalance(props.data.sell_price * count));
  };

  const onError = (error) => {
    setLoading();
    Swal.fire({
      icon: "error",
      title: error.message /*language.purchaseDone*/,
      showCancelButton: false,
      confirmButtonText: language.continue,
      confirmButtonColor: "#0063f7",
    });
  };

  const toNumber = (num) => parseFloat(num).toFixed(2);

  const addToCart = () => {
    dispatch(
      addCartItem({
        item_id: product_id,
        qty: props.data.category_type == 1 ? count : 1,
        type: props.data.category_type,
        description: description?.current?.value || "",
        price:
          props.data.sell_price && props.data.sell_price != 0
            ? props.data.sell_price
            : priceValue,
      })
    ).then(() => {
      navigate("/cart");
    });
  };
  return (
    <section className=" ">
      {loading && (
        <div className="vh-100 vw-100 position-fixed d-flex align-items-center justify-content-center top-0 left-0 right-0 bottom-0 overlay">
          <Oval color="#ffee00" height={80} width={80} />
        </div>
      )}
      <Row id="cart" className="cart--container">
        <Col
          xl={3}
          lg={3}
          md={3}
          xs={12}
          className="cart--product-img d-flex align-items-center justify-content-center mb-4 mb-xl-0 mb-lg-0"
        >
          <Image
            className="rounded-4 d-flex mh-100"
            src={`${STORAGE_URL}${props.data.image}`}
          />
        </Col>
        <Col xl={9} lg={9} md={9} xs={12}>
          <Row className="m-0">
            {props.data?.category_type === 2 ||
            props.data?.category_type === 1 ? (
              <Col
                xl={{ span: 7, order: 1 }}
                lg={{ span: 7, order: 1 }}
                md={{ span: 12, order: 2 }}
                xs={{ span: 12, order: 2 }}
                className="mt-3 mt-xl-0 mt-lg-0"
              >
                <Row>
                  {priceValue > props.data?.direct_charge_max_amount && (
                    <Col xs={12} className="mb-3">
                      <Alert variant="danger">
                        {language.alertChargeMaxAmount}
                        {props.data?.direct_charge_max_amount}
                      </Alert>
                    </Col>
                  )}

                  <Col xl={7} lg={10} md={7} xs={10} className="mb-3">
                    <h4 className="text-dark">{props.data.name}</h4>
                  </Col>

                  <Col xl={5} lg={2} md={5} xs={2} className="mb-3">
                    {isLoggedIn && (
                      <div
                        onClick={handleAddToFavorite}
                        className={`py-2 d-inline-flex gap-2 justify-content-center w-100 cart--wichlist-icon ${
                          favorite && "active"
                        }`}
                      >
                        <Icons.WishlistProfile />
                      </div>
                    )}
                  </Col>

                  <Col xl={4} lg={4} md={3} xs={4} className="mb-3">
                    <p className="text-primary fw-bold h6">{language.price}</p>
                  </Col>

                  <Col xl={8} lg={8} md={9} xs={8} className="mb-3">
                    <p className="text-dark h5 fw-bold">
                      {props.data?.sell_price > 0 &&
                        toNumber(props.data?.sell_price)}
                      {toNumber(props.data?.sell_price) == 0 &&
                        (priceValue > 0 ? toNumber(priceValue) : "---")}
                      {priceValue > 0
                        ? user?.place_parent.currency.toUpperCase()
                        : ""}
                    </p>
                  </Col>

                  <Col xl={4} lg={4} md={3} xs={4} className="mb-3">
                    <p className="text-primary fw-bold h6">
                      {language.quantity}
                    </p>
                  </Col>

                  <Col xl={8} lg={8} md={9} xs={8} className="mb-3">
                    <Row>
                      <Col sm={6} xs={7} className="rounded-2 bg-white border">
                        <div>
                          <Row className="align-items-center">
                            <Col xs={3}>
                              <button
                                className="w-100 border-0 bg-transparent p-0 text-center"
                                onClick={minusButtonHandler}
                              >
                                -
                              </button>
                            </Col>
                            <Col xs={6}>
                              <input
                                value={count}
                                autoFocus
                                className="w-100 form-control border-0 bg-transparent p-0 text-center"
                                onFocus={handleFocus}
                                type="number"
                                onChange={(event) => {
                                  const number = Number(event.target.value);
                                  if (number > 100) setCount(100);
                                  else if (number < 1 || isNaN(number))
                                    setCount(1);
                                  else setCount(number);
                                }}
                              />
                            </Col>
                            <Col xs={3}>
                              <button
                                className="w-100 border-0 bg-transparent p-0 text-center"
                                onClick={plusButtonHandler}
                              >
                                +
                              </button>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </Col>

                  <Col xl={4} lg={4} md={3} xs={4} className="mb-3">
                    <p className="text-primary fw-bold h6">
                      {language.totalPrice}
                    </p>
                  </Col>
                  <Col xl={8} lg={8} md={9} xs={8} className="mb-3">
                    <p className="text-dark h5 fw-bold ">
                      {props.data?.sell_price > 0 &&
                        toNumber(count * props.data.sell_price)}
                      {priceValue > 0
                        ? user?.place_parent.currency.toUpperCase()
                        : ""}
                    </p>
                  </Col>
                  <Col>
                    {user?.agent ? (
                      <Row className="gx-xl-4 gx-lg-2 gy-4">
                        <Col sm={6} xs={12}>
                          <Button
                            variant="primary"
                            className="btn btn-primary w-100 px-1"
                            onClick={() => buy(true)}
                            disabled={buyResponse.loading}
                          >
                            <span className="cut-text-1 ">
                              {language.buyWithPrinting}
                            </span>
                          </Button>
                        </Col>
                        <Col sm={6} xs={12} className="justify-content-start">
                          <Button
                            variant="outline-primary"
                            className="border border-2 border-primary w-100 px-1"
                            onClick={() => buy()}
                            disabled={buyResponse.loading}
                          >
                            <span className="cut-text-1">
                              {language.buyWithoutPrinting}
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    ) : (
                      <Row className="gx-xl-4 gx-lg-2 gy-4">
                        <Col sm={6} xs={12}>
                          <Button
                            variant="primary"
                            className="btn btn-primary w-100 px-1"
                            onClick={() => addToCart()}
                            disabled={buyResponse.loading}
                          >
                            <span className="cut-text-1 ">
                              {language.addToCart}
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Col>

                  <div className="d-none">
                    <ComponentToPrintOrderDetails
                      ref={componentRef}
                      index={null}
                      {...DataOrderDetails}
                    />
                  </div>
                </Row>
              </Col>
            ) : (
              <Col
                xl={{ span: 7, order: 1 }}
                lg={{ span: 7, order: 1 }}
                md={{ span: 12, order: 2 }}
                xs={{ span: 12, order: 2 }}
                className="mt-3 mt-xl-0 mt-lg-0"
              >
                <Row>
                  {priceValue > props.data?.direct_charge_max_amount && (
                    <Col xs={12} className="mb-3">
                      <Alert variant="danger">
                        {language.alertChargeMaxAmount}
                        {props.data?.direct_charge_max_amount}
                      </Alert>
                    </Col>
                  )}

                  <Col xl={7} lg={10} md={7} xs={10} className="mb-3">
                    <h4 className="text-dark">{props.data.name}</h4>
                  </Col>

                  <Col xl={5} lg={2} md={5} xs={2} className="mb-3">
                    {isLoggedIn && (
                      <div
                        onClick={handleAddToFavorite}
                        className={`py-2 d-inline-flex gap-2 justify-content-center w-100 cart--wichlist-icon ${
                          favorite && "active"
                        }`}
                      >
                        {/* logo image */}
                        <Icons.WishlistProfile />
                      </div>
                    )}
                  </Col>

                  <Col xl={4} lg={4} md={3} xs={4} className="mb-3">
                    <p className="text-primary fw-bold h6">
                      {language.amountRequired}
                    </p>
                  </Col>

                  <Col xl={8} lg={8} md={9} xs={8} className="mb-3">
                    <p className="text-dark h5 fw-bold">
                      {props.data?.sell_price &&
                      toNumber(props.data?.sell_price) != 0
                        ? toNumber(props.data?.sell_price) +
                          user?.place_parent.currency.toUpperCase()
                        : priceValue
                        ? toNumber(priceValue) +
                          user?.place_parent.currency.toUpperCase()
                        : "----"}
                    </p>
                  </Col>

                  <Col xl={4} lg={4} md={3} xs={4} className="mb-3">
                    <p className="text-primary fw-bold h6">
                      {language.totalBill}
                    </p>
                  </Col>

                  <Col xl={8} lg={8} md={9} xs={8} className="mb-3">
                    <p className="text-dar k h5 fw-bold ">
                      {toNumber(props.data?.sell_price) > 0
                        ? toNumber(props.data.sell_price) +
                          user?.place_parent.currency.toUpperCase()
                        : toNumber(priceValue) > 0
                        ? toNumber(priceValue) <=
                            props.data?.direct_charge_max_amount && (
                            <>
                              {toNumber(
                                parseFloat(priceValue) +
                                  (props.data?.direct_charge_app_commission +
                                    props.data
                                      ?.direct_charge_salesman_commission)
                              )}
                              {user?.place_parent.currency.toUpperCase()}
                            </>
                          )
                        : "---"}
                    </p>
                  </Col>

                  <Col xl={4} lg={4} md={3} xs={4} className="mb-3">
                    <p className="text-primary fw-bold h6">
                      {language.quantity}
                    </p>
                  </Col>

                  <Col xl={8} lg={8} md={9} xs={8} className="mb-3">
                    <p className="fw-bold h6">X1</p>
                  </Col>

                  <Col xl={4} lg={4} md={3} xs={4} className="mb-3">
                    <p className="text-primary fw-bold h6">
                      {props.data.label
                        ? props.data.label
                        : language.description}
                    </p>
                  </Col>

                  <Col xl={8} lg={8} md={9} xs={8} className="mb-3">
                    {props.data?.type_of_keyboard === "email-address" && (
                      <input
                        ref={description}
                        className={`"bg-white rounded-2 " ${
                          errors.description ? "border-danger" : ""
                        } `}
                        type="email"
                        required
                      />
                    )}
                    {props.data?.type_of_keyboard === "phone-pad" && (
                      <input
                        ref={description}
                        className={`"bg-white rounded-2 " ${
                          errors.description ? "border-danger" : ""
                        } `}
                        type="number"
                        pattern="[0-9]"
                        required
                      />
                    )}
                    {props.data?.type_of_keyboard !== "email-address" &&
                      props.data?.type_of_keyboard !== "phone-pad" && (
                        <input
                          ref={description}
                          className={`"bg-white rounded-2 " ${
                            errors.description ? "border-danger" : ""
                          } `}
                          type="text"
                          required
                        />
                      )}
                    <div className="text-danger">{errors?.description}</div>
                  </Col>
                  {toNumber(props.data.sell_price) == 0 && (
                    <>
                      <Col xl={4} lg={4} md={3} xs={4} className="mb-3">
                        <p className="text-primary fw-bold h6">
                          {language.cartPrice}
                        </p>
                      </Col>
                      <Col xl={8} lg={8} md={9} xs={8} className="mb-3">
                        <input
                          ref={price}
                          type="number"
                          value={priceValue}
                          placeholder="0"
                          onChange={(e) => {
                            let num = e.target.value;
                            if (num.toString().length <= 5) {
                              setPriceValue(num);
                            }
                          }}
                          className={`"bg-white rounded-2 " ${
                            errors.price ? "border-danger" : ""
                          } `}
                        />

                        <div className="text-danger">{errors?.price}</div>
                      </Col>
                    </>
                  )}

                  <Col
                    xl={5}
                    lg={6}
                    md={6}
                    xs={12}
                    className="justify-content-start"
                  >
                    {priceValue <= props.data?.direct_charge_max_amount &&
                      (user?.agent ? (
                        <Button
                          variant="primary"
                          className="btn btn-primary w-100"
                          onClick={() => buyWithSendHandler()}
                        >
                          {language.send}
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          className="btn btn-primary w-100 px-1"
                          onClick={() => addToCart()}
                          disabled={buyResponse.loading}
                        >
                          <span className="cut-text-1 ">
                            {language.addToCart}
                          </span>
                        </Button>
                      ))}
                  </Col>
                </Row>
              </Col>
            )}

            <Col
              xl={{ span: 5, order: 2 }}
              lg={{ span: 5, order: 2 }}
              md={{ span: 12, order: 1 }}
              xs={{ span: 12, order: 1 }}
              className="mt-md-0"
            >
              <div className="rounded-5 border border-2 border-light5 p-4 px-3">
                <Row>
                  <Col xs={12}>
                    <Row className="mt-3">
                      <Col lg={5} xs={3}>
                        <p className="text-primary">{language.cardType}</p>
                      </Col>
                      <Col lg={7} xs={9}>
                        <p className="text-light6 fw-bold">
                          {[
                            ...categoryTypes.filter(
                              (category) =>
                                category.id ===
                                (props.data?.category_type === 1 ? 2 : 1)
                            ),
                          ].map((category, index) => (
                            <React.Fragment key={index}>
                              {category.name}
                            </React.Fragment>
                          ))}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12}>
                    <Row>
                      <Col lg={5} xs={3}>
                        <p className="text-primary">{language.category}</p>
                      </Col>
                      <Col lg={7} xs={9}>
                        <p className="text-light6 fw-bold">
                          {props.data.category_name}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
        {/* Cart details section */}
      </Row>
    </section>
  );
}
