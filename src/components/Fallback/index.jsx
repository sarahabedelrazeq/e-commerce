import React from "react";
import { Oval } from "react-loader-spinner";

function Fallback() {
  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <Oval color="#00BFFF" height={80} width={80} />
    </div>
  );
}

export default React.memo(Fallback);
