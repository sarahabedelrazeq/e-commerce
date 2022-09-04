import React from "react";
import { Image } from "react-bootstrap";

const PasswordShow = ({ show, setShow }) => {
  return (
    <span
      className="login--showConfirmPassword position-absolute h-100"
      onClick={setShow}
    >
      <Image
        className={show ? "hideOpacity" : "showOpacity"}
        src="/images/UserProfile/showPassword.png"
      />
    </span>
  );
};
export default PasswordShow;
