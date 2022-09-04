import React from "react";
import { useLocation } from "react-router";

export default function Printer() {
  const location = useLocation();

  React.useEffect(() => {
  }, [location]);
  return <div>Printer</div>;
}
