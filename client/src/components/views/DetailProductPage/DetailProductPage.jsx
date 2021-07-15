import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { Row, Col } from "antd";

const DetailProductPage = (props) => {
  const [product, setProduct] = useState({});
  const productId = props.match.params.productId;

  useEffect(() => {
    axios
      .get(`/api/products/products_by_id?id=${productId}&type=single`)
      .then((res) => {
        if (res.data.success) {
          //   console.log(res.data);
          setProduct(res.data.product[0]);
        } else {
          alert("데이터를 불러오는데 실패했습니다.");
        }
      });
  }, []);
  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImage detail={product} />
        </Col>
        <Col lg={12} sm={24}>
          <ProductInfo detail={product} />
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(DetailProductPage);
