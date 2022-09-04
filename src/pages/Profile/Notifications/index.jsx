import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useLanguage, usePagination } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "store/user/actions";
import { PaginationSection, Skeleton, NoData} from "components";

export default function Notifications() {
  const language = useLanguage();

  const { notifications } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { page } = usePagination();

  React.useEffect(() => {
    dispatch(getNotifications(page));
  }, [dispatch, page]);

  return (
    <div id="notifications-page" className="page-container">
      <section id="notification">
        <Container>
          <Row className="mb-4 mb-md-5">
            <Col sx={12}>
              <h2 className="notification-title">{language.notification}</h2>
            </Col>
          </Row>
          {notifications.loading ? (
            <>
              <Row>
                {/* Item Date */}
                <Col xl={12} lg={12} md={12} xs={12}>
                  <Skeleton
                    count={1}
                    width="100%"
                    height={125}
                    className="mt-4"
                  />
                </Col>
              </Row>
              <Row>
                {/* Item Date */}
                <Col xl={12} lg={12} md={12} xs={12}>
                  <Skeleton
                    count={1}
                    width="100%"
                    height={125}
                    className="mt-4"
                  />
                </Col>
              </Row>
              <Row>
                {/* Item Date */}
                <Col xl={12} lg={12} md={12} xs={12}>
                  <Skeleton
                    count={1}
                    width="100%"
                    height={125}
                    className="mt-4"
                  />
                </Col>
              </Row>
              <Row>
                {/* Item Date */}
                <Col xl={12} lg={12} md={12} xs={12}>
                  <Skeleton
                    count={1}
                    width="100%"
                    height={125}
                    className="mt-4"
                  />
                </Col>
              </Row>
            </>
          ) : notifications.data?.length ? (
            notifications.data.map(({ start_date, description }, index) => (
              <Row
                className="position-relative notification--box mb-2 mb-md-3"
                key={index}
              >
                {/* Item Date */}
                <Col
                  xl={12}
                  lg={12}
                  md={12}
                  xs={12}
                  className="notification--date pt-3 px-3 px-xl-4 px-lg-4 px-md-4"
                >
                  <h6 className="h7">{start_date}</h6>
                </Col>

                {/* Item Text Area */}
                <Col xl={12} lg={12} md={12} xs={12}>
                  <h4 className="p-2 p-xl-3 p-lg-3 p-md-3 px-2 notification--textarea">
                    {description}
                  </h4>
                </Col>
              </Row>
            ))
          ) : (
            <NoData text={language.noNots} />
          )}
          <Row>
            <Col xl={12} lg={12} md={12} xs={12}>
              {!notifications.loading && notifications.data && (
                <PaginationSection
                  count={notifications.total}
                  perPage={notifications.per_page}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
