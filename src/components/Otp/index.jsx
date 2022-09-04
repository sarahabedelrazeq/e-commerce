import React from "react";
import { Col, Row } from "react-bootstrap";

function Otp({ onChange }) {
  const [otp, setOTP] = React.useState("");
  const otpInput1 = React.useRef(null);
  const otpInput2 = React.useRef(null);
  const otpInput3 = React.useRef(null);
  const otpInput4 = React.useRef(null);

  const handleSetOtp = (val) => {
    if (val.length > 1 || isNaN(Number(val))) return;
    if (val === "") {
      if (otp.length === 4 && document.activeElement === otpInput4.current) {
        otpInput3.current.focus();
      }
      if (otp.length === 3 && document.activeElement === otpInput3.current) {
        otpInput2.current.focus();
      }
      if (otp.length === 2 && document.activeElement === otpInput2.current) {
        otpInput1.current.focus();
      }
      return setOTP(
        (oldValue) => `${oldValue.substring(0, oldValue.length - 1)}`
      );
    }
    if (otp.length === 0 && document.activeElement === otpInput1.current) {
      otpInput2.current.focus();
    }
    if (otp.length === 1 && document.activeElement === otpInput2.current) {
      otpInput3.current.focus();
    }
    if (otp.length === 2 && document.activeElement === otpInput3.current) {
      otpInput4.current.focus();
    }
    setOTP((oldValue) => `${oldValue}${val}`);
    onChange(`${otp}${val}`);
  };

  React.useEffect(() => {
    otpInput1.current.focus();
  }, []);

  React.useEffect(() => {}, [otp]);

  return (
    <div>
      <Row dir="ltr">
        <Col xs={3}>
          <input
            ref={otpInput1}
            className="otp-input rounded-sm w-100"
            type="text"
            min={0}
            step={1}
            onChange={(e) => handleSetOtp(e.target.value)}
            value={otp.substring(0, 1)}
            dir="ltr"
          />
        </Col>
        <Col xs={3}>
          <input
            ref={otpInput2}
            className="otp-input rounded-sm w-100"
            type="text"
            min={0}
            step={1}
            onChange={(e) => handleSetOtp(e.target.value)}
            value={otp.substring(1, 2)}
            dir="ltr"
          />
        </Col>
        <Col xs={3}>
          <input
            ref={otpInput3}
            className="otp-input rounded-sm w-100"
            type="text"
            min={0}
            step={1}
            onChange={(e) => handleSetOtp(e.target.value)}
            value={otp.substring(2, 3)}
            dir="ltr"
          />
        </Col>
        <Col xs={3}>
          <input
            ref={otpInput4}
            className="otp-input rounded-sm w-100"
            type="text"
            min={0}
            max={0}
            step={1}
            onChange={(e) => handleSetOtp(e.target.value)}
            value={otp.substring(3, 4)}
            dir="ltr"
          />
        </Col>
      </Row>
    </div>
  );
}

export default Otp;
