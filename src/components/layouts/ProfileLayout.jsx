import { Container, Col, Row } from "react-bootstrap";
import { ProfileList } from "components";

export default function ProfileLayout(props) {
  return (
    <div id={props.id} className="page-container">
      <section id="main-section">
        <Container>
          <Row>
            <Col xl={4} lg={4} md={12} xs={12}>
              <ProfileList />
            </Col>
            <Col xl={8} lg={8} md={12} xs={12} className="pt-4 pt-md-5">
              <div className="px-xxl-5 px-xl-4 h-100">{props.children}</div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
