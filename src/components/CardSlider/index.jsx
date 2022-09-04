import React from "react";
import { Image } from "react-bootstrap";
import Slider from "react-slick";
import { STORAGE_URL } from "constants";
import {Card} from "components";

const SampleNextArrow = ({ className, style, onClick }) => (
  <Image
    className={`${className} arrows-dir`}
    style={{
      ...style,
    }}
    onClick={onClick}
    src="/icons/Vector-left.svg"
  />
);

const SamplePrevArrow = ({ className, style, onClick }) => (
  <Image
    className={`${className} arrows-dir`}
    style={{
      ...style,
    }}
    onClick={onClick}
    src="/icons/Vector-right.svg"
  />
);

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1399,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
      },
    },
  ],
};

function CardSlider({ items }) {
  return (
    <div id="CardSlider">
      <Slider dir="ltr" {...settings}>
        {items.map((subItem, index) => (
          <div key={index} className="card-container">
            <Card
              image={STORAGE_URL + subItem.image}
              link={`product/${subItem.id}`}
              text={subItem.name}
              className="items--slider-image-hover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default CardSlider;
