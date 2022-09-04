import React from "react";
import { LatestSection } from "components";
import { useFetch } from "hooks";
import Hero from "./sections/Hero";

/* Home - page  */
export default function Home() {
  const [itemResponse, itemRequest] = useFetch("general/get-slider");
  const dataContent = itemResponse.result.data;

  React.useEffect(() => {
    itemRequest(null);
  }, [itemRequest]);

  return (
    <div id="home-page" className="page-container">
      {(itemResponse.loading || dataContent?.length > 0) && (
        <section id="MainSlider">
          <Hero loading={itemResponse.loading} items={dataContent} />
        </section>
      )}

      <section id="latestSection">
        <LatestSection />
      </section>
    </div>
  );
}
