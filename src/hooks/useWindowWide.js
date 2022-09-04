import React from "react";

const useWindowWide = () => {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidth]);

  return width;
};

export default useWindowWide;
