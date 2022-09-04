import React from "react";
import { Col, Row, Button, Offcanvas } from "react-bootstrap";

export default function SideBar(props) {

  return (
    <div className="">
      <Row className={`d-${props.hiddenOn}-none`}>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <Button
            variant="none"
            className="w-100 p-0 text-center"
            onClick={props.setShow}
          >
            {props.icon}
          </Button>

          <Offcanvas show={props.show} onHide={props.setShow} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>{props.title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>{props.children}</Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </div>
  );
}
