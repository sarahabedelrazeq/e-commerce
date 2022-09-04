import React from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useFetch, useLanguage } from "hooks";
import { Icons } from "components";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { STORAGE_URL } from "constants";
import moment from "moment";

export default function Footer() {
  const language = useLanguage();
  const { appInfos } = useSelector((state) => state.general);
  const [itemResponse, itemRequest] = useFetch("general/get-social_media");

  const DataContent = itemResponse.result.data;

  React.useEffect(() => {
    itemRequest(null);
  }, [itemRequest]);

  return (
    <footer id="footer">
      <section className="footer--container">
        <Container>
          <Row className="justify-content-center">
            <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mb-4 mb-lg-5">
              <Row>
                <Col xl={12} lg={12} md={12} xs={12} className="mb-3 mb-lg-4">
                  <div className="py-2 d-inline-flex gap-2 justify-content-center justify-content-xl-start justify-content-xl-start justify-content-md-start w-100">
                    <Icons.FooterLogo />
                  </div>
                </Col>

                <Col xl={12} lg={12} md={12} xs={12} className="mb-3 mb-lg-4">
                  <h6>{language.sadeedCaption}</h6>
                </Col>

                <Col xs={12}>
                  <div className="list-group list-group-horizontal bg-transparent gap-4">
                    {!itemResponse.loading &&
                      DataContent?.map((item, index) => (
                        <NavLink
                          key={index}
                          to={item.url}
                          target="_blank"
                          className="list-group-item d-flex justify-content-center align-items-center bg-transparent border-0 p-0"
                        >
                          <Image
                            className="footer--social-icons rounded-1 "
                            alt={item.name}
                            src={`${STORAGE_URL}${item.icon}`}
                          />
                        </NavLink>
                      ))}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl={5} lg={5} md={6} sm={12} xs={12} className="mb-4 mb-lg-5">
              <Row className="px-sm-4 px-md-0">
                <Col xs={6} md={6} lg={6}>
                  <Row>
                    <Col xl={12} lg={12} md={12} xs={12}>
                      <h4 className="text-info fw-bold mb-4 mb-lg-5 cut-text-1">
                        {language.quickLinks}
                      </h4>
                    </Col>

                    <Col
                      xl={12}
                      lg={12}
                      md={12}
                      xs={12}
                      className="footer--middle-links"
                    >
                      <ul>
                        {appInfos.map((element, index) => (
                          <li className="mb-2 mb-lg-3" key={index}>
                            <Link
                              className="h5 text-info"
                              to={`/public-page/${element.machine_name}`}
                            >
                              {element.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                </Col>
                <Col xs={6} md={6} lg={6}>
                  <Row className="mx-0 mx-xl-1 mx-lg-1">
                    <Col xl={12} lg={12} md={12} xs={12}>
                      <h4 className="text-info fw-bold mb-4 mb-lg-5 cut-text-1">
                        {language.customerService}
                      </h4>
                    </Col>
                    <Col
                      xl={12}
                      lg={12}
                      md={12}
                      xs={12}
                      className="footer--middle-links text-info"
                    >
                      <ul>
                        <li className="mb-2 mb-lg-3">
                          <NavLink className="h5 text-info" to="/">
                            {language.home}
                          </NavLink>
                        </li>
                        <li className="mb-2 mb-lg-3">
                          <NavLink className="h5 text-info" to="/categories">
                            {language.categories}
                          </NavLink>
                        </li>
                        <li className="mb-2 mb-lg-3">
                          <NavLink className="h5 text-info" to="/my-orders">
                            {language.myOrders}
                          </NavLink>
                        </li>
                        <li className="mb-2 mb-lg-3">
                          <NavLink
                            className="h5 text-info"
                            to="/contact-us-form"
                          >
                            {language.complaintsAndSuggestions}
                          </NavLink>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col
              xxl={2}
              xl={2}
              lg={3}
              md={12}
              sm={6}
              xs={6}
              className="mb-4 mb-lg-5"
            >
              <Row>
                <Col xs={12}>
                  <h4 className="text-info fw-bold mb-4 mb-lg-5 cut-text-1 d-none d-md-block">
                    {language.DownloadApp}
                  </h4>
                  <h4 className="text-center d-md-none text-info fw-bold mb-4 mb-lg-5 cut-text-1">
                    {language.DownloadApp}
                  </h4>
                </Col>

                <Col xs={12}>
                  <Row className="justify-content-center">
                    <Col xs={12} md={5} lg={12} className="mb-3">
                      <a
                        target="_blank"
                        href="https://play.google.com/store/apps/details?id=com.natejsoft.sadeedagents"
                      >
                        <Image
                          className="w-100"
                          role="button"
                          src="/images/Footer/footer-googleplay.svg"
                        />
                      </a>
                    </Col>
                    <Col xs={12} md={5} lg={12}>
                      <a
                        target="_blank"
                        href="https://apps.apple.com/gb/app/alsadeed-agent-%D8%A7%D9%84%D8%B3%D8%AF%D9%8A%D8%AF-%D8%A7%D9%84%D9%88%D9%83%D9%8A%D9%84/id1621069236?uo=2"
                      >
                        <Image
                          className="w-100"
                          role="button"
                          src="/images/Footer/footer-appstore.svg"
                        />
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <p className="text-primary text-center h6">
              {language.copyRight} {moment().format("YYYY")} © {language.copyRightText}
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
}
