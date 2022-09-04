import { useLanguage } from "hooks";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const ToPrintDirectCards = React.forwardRef((props, ref) => {
  const language = useLanguage();

  return (
    <section id="ToPrintDirectCards">
      <Container>
        <Row
          ref={ref}
          className="pt-3 mt-4 mx-2"
          style={{
            direction: language.dir,
          }}
        >
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="pb-0 d-inline-flex"
          >
            <p className="print--text-directCards">
              {language.tableDate}
              {":"}
            </p>
            <p className="print--text-directCards px-1"> {props.created_at}</p>
          </Col>
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="pb-0 d-inline-flex"
          >
            <p className="print--text-directCards">
              {language.product}
              {":"}
            </p>
            <p className="print--text-directCards px-1">{props?.item?.name}</p>
          </Col>
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="pb-0 d-inline-flex"
          >
            <p className="print--text-directCards">
              {language.orderNumber}
              {":"}
            </p>
            <p className="print--text-directCards px-1">{props.id}</p>
          </Col>
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="pb-0 d-inline-flex"
          >
            <p className="print--text-directCards">
              {language.description}
              {":"}
            </p>
            <p className="print--text-directCards px-1">{props.description}</p>
          </Col>
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="pb-0 d-inline-flex"
          >
            <p className="print--text-directCards">
              {language.storeBuyerName}
              {":"}
            </p>
            <p className="print--text-directCards px-1">
              {props.user?.agent ? props.user?.agent?.name : props.user.name}
            </p>
          </Col>
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="pb-0 d-inline-flex"
          >
            <p className="print--text-directCards">
              {language.price}
              {":"}
            </p>
            <p className="print--text-directCards px-1">
              {props.sell_price}  {props?.user.place_parent.currency}
            </p>
          </Col>
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="d-inline-flex"
          >
            <p className="print--text-directCards">
              {language.totalAmount}
              {":"}
            </p>
            <p className="print--text-directCards px-1">
              {props.total_amount}
              {"  "}
              {props?.user.place_parent.currency}
            </p>
          </Col>
          {/* <Col
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="mt-4"
                    >
                        <p className="print--text-directCards text">---</p>
                    </Col> */}
        </Row>
      </Container>
    </section>
  );
});

export default ToPrintDirectCards;
