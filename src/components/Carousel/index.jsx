import {
  Col,
  Row,
  Carousel as BootstrapCarousel,
  Button,
  Image,
} from "react-bootstrap";
import { STORAGE_URL } from "constants";

/* Main Slider Component  */
export default function Carousel({ dataContent }) {
  return (
    <BootstrapCarousel
      variant="dark"
      pause="true"
      direction="left"
      interval={null}
      onSlide={(e, direction) => {
        direction = "right";
      }}
    >
      {dataContent.map((items, index) => (
        <BootstrapCarousel.Item key={index} interval={null}>
          <Row className="align-items-center px-md-2">
            <Col xs={12} md={6} lg={6}>
              {/* Slider caption - {start} */}
              <Row>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <h4 className="text-Teal">{items.line_1_text}</h4>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <h1 className="text-primary">{items.line_2_text}</h1>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <h1 className="text-primary">{items.line_3_text}</h1>
                </Col>
                {/* item link */}
                <Col
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <Button className="btn-primary px-4 px-lg-5" href={items.url}>
                    {items.button_text}
                  </Button>
                </Col>
              </Row>
              {/* Slider caption - {end} */}
            </Col>
            <Col xs={12} md={6} lg={6}>
              {/* slider image - {start} */}
              <Image
                className="w-100"
                src={`${STORAGE_URL}${items.image}`}
                alt="First slide"
              />
              {/* slider image - {end} */}
            </Col>
          </Row>
        </BootstrapCarousel.Item>
      ))}
    </BootstrapCarousel>
  );
}
