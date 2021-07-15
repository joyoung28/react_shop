import React from "react";
import { Carousel } from "antd";

const ImageSlider = ({ images }) => {
  // console.log(images);
  const imagesResult = images.map((image, index) => (
    <div key={index}>
      <img
        style={{ width: "100%", maxHeight: "200px" }}
        src={`http://localhost:5000/${image}`}
        alt=""
      />
    </div>
  ));

  return (
    <div>
      {" "}
      <Carousel autoplay>{imagesResult}</Carousel>
    </div>
  );
};

export default ImageSlider;
