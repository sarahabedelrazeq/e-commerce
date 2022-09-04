import React from "react";
import { Col, Row } from "react-bootstrap";
import { Skeleton } from "components";
import { useSelector } from "react-redux";
import { useLanguage } from "hooks";
import { ProfileLayout } from "components/layouts";

export default function StoreProfile({ isUser }) {
  const language = useLanguage();
  const userInfo = useSelector((state) =>
    isUser ? state.auth.user : state.auth.user?.agent
  );
  const user = useSelector((state) => state.auth.user);

  return (
    <ProfileLayout id="wallet-page">
      {(user?.agent || isUser) ? (
        <Row id="userStore">
          {isUser ? (
            <Col xl={12} lg={12} md={12} xs={12} className="mb-4 mb-md-5">
              <h4 className="fw-bold">
                {language.accountInformation} {userInfo.name}{" "}
              </h4>
            </Col>
          ) : (
            <Col xl={12} lg={12} md={12} xs={12} className="mb-4 mb-md-5">
              <h4 className="fw-bold">{language.accountInformationStore}</h4>
            </Col>
          )}

          {/* Store Form - {start} */}
          {userInfo ? (
            <Col xl={12} lg={12} md={12} xs={12}>
              <Row>
                {/* Store name */}
                {!isUser && (
                  <Col xl={12} lg={12} md={12} xs={12} className="mt-1">
                    <Row className="mb-2 p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0">
                      <Col xs={12}>
                        <h6 className="text-light6">{language.storeName}</h6>
                      </Col>
                      <Col xs={12}>
                        <div className="input-container bg-white w-100">
                          {userInfo?.name}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                )}

                {/* user first name */}
                <Col xl={6} lg={6} md={6} xs={12} className="mt-1">
                  <Row className="mb-2 p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0">
                    <Col>
                      <h6 className="text-light6">{language.name}</h6>
                    </Col>
                    <Col xs={12}>
                      <div className="input-container bg-white w-100">
                        {isUser ? userInfo?.name : userInfo?.agent_name}
                      </div>
                    </Col>
                  </Row>
                </Col>
                {/* user last name */}

                {/* user phone */}
                <Col xl={6} lg={6} md={6} xs={12} className="mt-1">
                  <Row className="mb-2 p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0">
                    <Col xs={12}>
                      <h6 className="text-light6">{language.phone}</h6>
                    </Col>
                    <Col xs={12}>
                      <div className="input-container bg-white w-100">
                        {userInfo?.phone}
                      </div>
                    </Col>
                  </Row>
                </Col>
                {/* user address */}
                <Col xl={12} lg={12} md={12} xs={12} className="mt-1">
                  <Row className="mb-2 p-0 p-xl-1 p-lg-1 p-md-1 p-sm-0 p-xs-0">
                    <Col xs={12}>
                      <h6 className="text-light6">
                        {language.detailedAddress}
                      </h6>
                    </Col>
                    <Col xs={12}>
                      <div className="input-container bg-white w-100">
                        {isUser
                          ? userInfo?.place_parent.name +
                            " / " +
                            userInfo?.place.name
                          : userInfo?.address}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          ) : (
            <Row>
              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="justify-content-start mt-2 pt-4 mb-4 align-items-center"
              >
                <Skeleton count={1} width="100%" height={300} />
              </Col>
            </Row>
          )}
        </Row>
      ) : (
        <></>
      )}
    </ProfileLayout>
  );
}
