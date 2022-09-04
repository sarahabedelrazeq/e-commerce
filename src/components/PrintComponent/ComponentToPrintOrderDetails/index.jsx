import { useLanguage } from "hooks";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Barcode from "react-barcode";

const ComponentToPrintOrderDetails = React.forwardRef((props, ref) => {
  const language = useLanguage();
  return (
    <div>
      <div ref={ref}>
        {props.order_details?.map((item, index) =>
          props?.index === index || props?.index === null ? (
            <Row
              id={props.id}
              style={{ direction: language.dir, height: "440px" }}
              key={index}
            >
              <Col xs={12}>
                <p className="mb-2">
                  {language.tableDate}: {props.created_at}
                </p>
              </Col>
              <Col xs={12}>
                <p className="mb-2">
                  {language.tableProduct}: {props?.item?.name}
                </p>
              </Col>
              <Col xs={12}>
                <p className="mb-2 ">
                  {language.serialNo}: {item.cards.serial_no}
                </p>
              </Col>
              <Col xs={12}>
                <p className="text-center border border-2 border-dark mb-2 mx-2">
                  {item.cards.bins?.map((binItem, index) => (
                    <span key={index}>{binItem.bin}</span>
                  ))}
                </p>
              </Col>
              {props?.show_name_flag && (
                <Col xs={12}>
                  <p className="mb-2">
                    {language.agentName}: {props?.show_name_flag}
                  </p>
                </Col>
              )}
              {props?.show_phone_flag && (
                <Col xs={12}>
                  <p className="mb-2">
                    {language.phone}: {props?.show_phone_flag}
                  </p>
                </Col>
              )}
              <Col xs={12}>
                <p className="mb-2">
                  {language.referenceNumber}:{" "}
                  {props?.order_details[0]?.cards?.refID}
                </p>
              </Col>
              <Col xs={12}>
                <p className="mb-2">{props?.text}</p>
              </Col>
              <Col xs={12} className={`d-flex justify-content-center`}>
                <Barcode
                  value={item.cards.serial_no}
                  height={30}
                  className={`d-block bg-primary`}
                />
              </Col>
            </Row>
          ) : null
        )}
        {props?.chargeData && (
          <Row
            id={props.id}
            style={{ direction: language.dir, height: "440px" }}
          >
            <Col xs={12}>
              <p className="mb-2">
                {language.tableDate}: {props.created_at}
              </p>
            </Col>
            <Col xs={12}>
              <p className="mb-2">
                {language.tableProduct}: {props?.item?.name}
              </p>
            </Col>
            <Col xs={12}>
              <p className="mb-2">
                {language.orderNumber}: {props?.id}
              </p>
            </Col>
            {props?.show_name_flag && (
              <Col xs={12}>
                <p className="mb-2">
                  {language.agentName}: {props?.show_name_flag}
                </p>
              </Col>
            )}
            {props?.show_phone_flag && (
              <Col xs={12}>
                <p className="mb-2">
                  {language.phone}: {props?.show_phone_flag}
                </p>
              </Col>
            )}

            <Col xs={12}>
              <p className="mb-2">
                {language.description}:{props?.type === 1 && props?.item.name}
                {props?.type === 2 && language.chargeProcess}
                {props?.type === 3 && props?.description}
              </p>
            </Col>
            <Col xs={12}>
              <p className="mb-2">
                {language.totalAmount}:
                {(props?.type === 1 || props?.type === 3) &&
                  props?.total_amount}{" "}
                {props?.user.place_parent.currency}
                {props?.type === 2 && props?.statement_of_account.balance}
              </p>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
});

export default ComponentToPrintOrderDetails;
