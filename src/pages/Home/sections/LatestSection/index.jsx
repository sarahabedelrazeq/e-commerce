import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useFetch } from "hooks";
import { useSelector } from "react-redux";
import SectionSkeleton from "./SectionSkeleton";
import { MainSection, CardSlider, NoData } from "components";

function LatestSection() {
  const { categoryTypes } = useSelector((state) => state.app);
  const [currentTab, setCurrentTab] = React.useState(null);
  const [itemResponse, itemRequest] = useFetch("agent/get-web-home-data");
  const DataContent = itemResponse.result.data;

  React.useEffect(() => {
    if (!currentTab && categoryTypes.length > 0) {
      setCurrentTab(categoryTypes[0].id);
    }
  }, [categoryTypes, currentTab]);

  React.useEffect(() => {
    if (currentTab) {
      itemRequest(null, `?type_id=${currentTab}`);
    }
  }, [itemRequest, currentTab]);

  function dataChecker() {
    let dataVar = false;
    for (let i = 0; i < DataContent?.length; i++) {
      if (DataContent[i].items?.length !== 0) {
        dataVar = true;
      }
    }
    return dataVar;
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} className="mb-5">
            <MainSection
              tabs={categoryTypes}
              currentTab={currentTab}
              setCurrentTab={(tab) => setCurrentTab(tab)}
            />
          </Col>
          <Col xs={12}>
            <div>
              {itemResponse.loading ? (
                <SectionSkeleton />
              ) : (
                DataContent &&
                (dataChecker() ? (
                  DataContent.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.items.length > 0 && (
                        <Row className="mb-5">
                          <Col xs={12} className="mb-4">
                            <div className="d-flex align-items-center gap-3">
                              <div className="mw-100">
                                <h2 className="text-info text-nowrap m-0 fw-bold cut-text-1">{item.name}</h2>
                              </div>
                              <div className="w-100">
                                <hr className="border-2 border-light5 m-0" />
                              </div>
                            </div>
                          </Col>
                          <Col xs={12}>
                            <CardSlider items={item.items} />
                          </Col>
                        </Row>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <NoData />
                ))
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default LatestSection;
