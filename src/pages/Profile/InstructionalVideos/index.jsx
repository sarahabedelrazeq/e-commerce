import React from "react";
import { Col, Row } from "react-bootstrap";
import { Skeleton, VideoImage } from "components";
import { useFetch, useLanguage } from "hooks";
import { ProfileLayout } from "components/layouts";

export default function InstructionalVideos() {
  const language = useLanguage();
  const [itemResponse, itemRequest] = useFetch(
    "/general/get-instructional-videos"
  );

  const DataContent = itemResponse.result.data;

  React.useEffect(() => {
    itemRequest(null);
  }, [itemRequest]);

  return (
    <ProfileLayout id="contact-us-page">
      <Row id="ContactUs" className="g-4">
        <Col xs={12}>
          <h4 className="fw-bold">{language.instructionalVideos}</h4>
        </Col>
        {!itemResponse.loading ? (
          DataContent?.map((item, index) => (
            <Col xs={6} key={index}>
              <Row>
                <Col xs={12}>
                  <VideoImage image={item.image} video={item.video_link} />
                </Col>
                <Col xs={12}>
                  <p></p>
                </Col>
              </Row>
            </Col>
          ))
        ) : (
          <>
            <Col
              xs={6}
              className="justify-content-start align-items-center mb-4"
            >
              <Skeleton count={1} width="100%" height={120} />
            </Col>
            <Col
              xs={6}
              className="justify-content-start align-items-center mb-4"
            >
              <Skeleton count={1} width="100%" height={120} />
            </Col>
            <Col
              xs={6}
              className="justify-content-start align-items-center mb-4"
            >
              <Skeleton count={1} width="100%" height={120} />
            </Col>
          </>
        )}
      </Row>
    </ProfileLayout>
  );
}
