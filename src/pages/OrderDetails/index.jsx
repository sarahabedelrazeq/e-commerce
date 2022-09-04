import React from "react";
import { useFetch, useLanguage, useToggle } from "hooks";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Skeleton, TableOrdersDetails } from "components";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrintOrderDetails } from "components/PrintComponent";

export default function OrderDetails() {
  const language = useLanguage();
  const { order_id } = useParams();
  const [itemResponse, itemRequest] = useFetch("agent/get-order-details");
  const DataContent = itemResponse.result.data;
  let componentRef = React.useRef();

  React.useEffect(() => {
    itemRequest(null, `?order_id=${order_id}`);
  }, [itemRequest, order_id]);

  const [print, setPrint] = useToggle();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  React.useEffect(() => {
    if (print) {
      handlePrint();
      setPrint();
    }
  }, [print, handlePrint, setPrint]);

  return (
    <div className="page-container">
      <section id="orderDetails" className="main-class">
        <Container>
          <Row>
            <Col className="mb-4 mb-lg-5">
              <h2 className="text-center">{language.orderDetails}</h2>
            </Col>
          </Row>

          {itemResponse.loading ? (
            <Row>
              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="justify-content-start mt-2 pt-4 mb-4 align-items-center"
              >
                <Skeleton
                  count={1}
                  width="100%"
                  height={400}
                  // className="mb-4"
                />
              </Col>
            </Row>
          ) : DataContent?.type === 1 ? (
            <TableOrdersDetails data={DataContent} orderId={order_id} />
          ) : (
            (DataContent?.type === 2 || DataContent?.type === 3) && (
              <Row className="bg-light w-75 m-auto rounded-3">
                <Col xl={12} lg={12} md={12} xs={12}>
                  <Row>
                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 p-xl-3 p-lg-3 p-md-3 px-2 text-dark">
                        {language.tableDateAndTime}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 text-dark">
                        {DataContent?.created_at}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 p-xl-3 p-lg-3 p-md-3 px-2 text-dark">
                        {language.product}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 text-dark">
                        {DataContent.item?.name}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 p-xl-3 p-lg-3 p-md-3 px-2 text-dark">
                        {language.orderNumber}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 text-dark">{DataContent?.id}</h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 p-xl-3 p-lg-3 p-md-3 px-2 text-dark">
                        {language.description}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 text-dark">
                        {DataContent.type === 1 && DataContent.item.name}
                        {DataContent.type === 2 && language.chargeProcess}
                        {DataContent.type === 3 && DataContent.description}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 p-xl-3 p-lg-3 p-md-3 px-2 text-dark">
                        {language.storeBuyerName}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 text-dark">
                        {DataContent.user?.agent
                          ? DataContent.user?.agent?.name
                          : DataContent.user.name}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 p-xl-3 p-lg-3 p-md-3 px-2 text-dark">
                        {language.amount}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 text-dark">
                        {(DataContent.type === 1 || DataContent.type === 3) &&
                          DataContent.sell_price}{" "}
                        {DataContent?.user.place_parent.currency}
                        {DataContent.type === 2 &&
                          DataContent.statement_of_account.balance}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 p-xl-3 p-lg-3 p-md-3 px-2 text-dark">
                        {language.totalAmount}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 text-dark">
                        {(DataContent.type === 1 || DataContent.type === 3) &&
                          DataContent.total_amount}{" "}
                        {DataContent?.user.place_parent.currency}
                        {DataContent.type === 2 &&
                          DataContent.statement_of_account.balance}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <h5 className="p-2 p-xl-3 p-lg-3 p-md-3 px-2 text-dark">
                        {language.print}
                      </h5>
                    </Col>

                    <Col xl={6} lg={6} md={6} xs={6}>
                      <div id="print_component">
                        <Button
                          variant="primary"
                          onClick={() => {
                            setPrint();
                          }}
                        >
                          {language.print}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <div className="d-none">
                  <ComponentToPrintOrderDetails
                    ref={componentRef}
                    index={null}
                    chargeData={DataContent}
                    {...DataContent}
                    order_details={[]}
                  />
                </div>
              </Row>
            )
          )}
        </Container>
      </section>
    </div>
  );
}
