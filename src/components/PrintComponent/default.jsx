import React from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import {ComponentToPrint} from "components";

export default function PrintComponent() {
  let componentRef = React.useRef();

  return (
    <>
      <div id="print_component">
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <div style={{ display: "none" }}>
          <ComponentToPrint ref={(el) => (componentRef = el)} />
        </div>
      </div>
    </>
  );
}
