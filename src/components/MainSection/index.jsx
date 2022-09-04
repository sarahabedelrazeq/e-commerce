import React from "react";
import { ToggleButtonGroup, Col, Row } from "react-bootstrap";
import { STORAGE_URL } from "constants";

/* Main Section Component */
const MainSection = ({ tabs, currentTab, setCurrentTab }) => (
  <div>
    <Row className="toggle--row-padd" id="MainSection">
      <ToggleButtonGroup
        type="text"
        name="options"
        defaultValue={1}
        className="overflow-hidden"
      >
        {tabs?.map((tab, index) => (
          <Col xs={6} md={6} lg={6} key={index}>
            {/* Main Section right-box - {Start} */}
            <Row
              className={`p-0 m-0 w-100 toggle--box toggle--box-${
                index === 0 ? "right" : "left"
              }
                  ${tab.id === currentTab && " active"}
                  `}
              onClick={() => {
                tab.id !== currentTab && setCurrentTab(tab.id);
              }}
            >
              <Col
                md={4}
                xs={5}
                style={{ backgroundImage: `url(${STORAGE_URL}${tab.image})` }}
                className="img"
              ></Col>
              <Col
                md={8}
                xs={7}
                className="d-flex align-items-center px-2 py-4 py-sm-5 py-md-5 py-lg-5 py-xl-5 justify-content-center px-0 mh-100"
              >
                <h1 className="toggle--box-desc-main mb-0">{tab.name}</h1>
              </Col>
            </Row>
          </Col>
        ))}
      </ToggleButtonGroup>
    </Row>
  </div>
);

export default MainSection;
