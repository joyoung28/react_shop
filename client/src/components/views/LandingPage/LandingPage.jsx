import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Card, Row } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import ImageSlider from "../../utils/ImageSlider";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    let body = {
      skip: skip,
      limit: limit,
    };
    axios.post("/api/products/products", body).then((res) => {
      if (res.data.success) {
        console.log(res.data.productInfo);
        setProducts(res.data.productInfo);
      } else {
        console.log(res.data);
      }
    });
  }, []);

  const loadMordHandler = () => {};

  const { Meta } = Card;
  const renderCard = products.map((product) => {
    return (
      <Col lg={6} md={8} xs={24} key={product._id}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={product.description} />
        </Card>
      </Col>
    );
  });

  return (
    <div
      style={{
        width: "75%",
        margin: "3rem auto",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere
          <RocketOutlined />
        </h2>
        <Row gutter={[16, 15]}>{renderCard}</Row>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMordHandler}>더보기</button>
      </div>
    </div>
  );
};

export default LandingPage;
