import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Slider = () => {
  return (
    <div className="slider">
      <Carousel autoPlay infiniteLoop interval={2000} >
        <div>
          <img
            alt="Slider img"
            src="https://mediapark.uz/_next/image?url=https%3A%2F%2Fcdn.newmediapark.uz%2Fimages%2Fafbf73fd-5605-4b3c-889f-02c68258bdd5_PHON-1.png&w=1920&q=75"
          />
        </div>
        <div>
          <img
            alt="Slider img"
            src="https://mediapark.uz/_next/image?url=https%3A%2F%2Fcdn.newmediapark.uz%2Fimages%2F274c8529-192a-4525-a5d5-0d971e48be50_c55_banner_1170%D1%85408_ru.jpg&w=1920&q=75"
          />
        </div>

        <div>
          <img
            src="https://mediapark.uz/_next/image?url=https%3A%2F%2Fcdn.newmediapark.uz%2Fimages%2Fcf9e1e11-e07a-4755-9312-e40efb8e2021_S23_Buds2_Summer_1170x408_ru.png&w=1920&q=75"
            alt="Slider img"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
