import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Skeleton } from "components";
import { useFetch, useLanguage } from "hooks";
import { ProfileLayout } from "components/layouts";

export default function ContactUs() {
  const language = useLanguage();
  const [itemResponse, itemRequest] = useFetch("general/get-contact-persons");

  const DataContent = itemResponse.result.data;

  React.useEffect(() => {
    itemRequest(null);
  }, [itemRequest]);

  return (
    <ProfileLayout id="contact-us-page">
      <Row id="ContactUs">
        <Col xs={12}>
          <h4 className="mb-4 mb-md-5 fw-bold ">{language.contactUs}</h4>
        </Col>
        {!itemResponse.loading ? (
          DataContent?.map((item, index) => (
            <Col xs={12} key={index}>
              <div className="contactUs--box rounded-3 bg-light align-items-center p-2 p-md-4">
                <Row className="gx-2 gx-md-4">
                  <Col xl={2} lg={2} md={2} xs={2}>
                      <Image src="/images/user-image.png" className="mw-100" width="70" />
                  </Col>
                  <Col xl={8} lg={8} md={8} xs={8}>
                    <h6 className="text-dark fw-bold mb-2">{item.name}</h6>
                    <p className="mb-2">
                      <a className="text-dark" href={`mailto:${item.email}`}>
                        {item.email}
                      </a>
                    </p>
                    <p className="mb-2">
                      <a className="text-dark" href={`tel:${item.phone}`}>
                        {item.phone}
                      </a>
                    </p>
                    <p className="mb-0">{item.notes}</p>
                  </Col>
                  <Col
                    xl={2}
                    lg={2}
                    md={2}
                    xs={2}
                    className="contactUs--phone"
                  >
                    <a href={`tel:${item.phone}`}>
                      <Image src="/images/ContactUs/contactUs.png" title={item.phone} />
                    </a>
                  </Col>
                </Row>
              </div>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <Row>
              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="justify-content-start align-items-center"
              >
                <Skeleton count={1} width="100%" height={120} />
              </Col>
              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="justify-content-start align-items-center"
              >
                <Skeleton count={1} width="100%" height={120} />
              </Col>
              <Col
                xl={12}
                lg={12}
                md={12}
                xs={12}
                className="justify-content-start align-items-center"
              >
                <Skeleton count={1} width="100%" height={120} />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </ProfileLayout>
  );
}
