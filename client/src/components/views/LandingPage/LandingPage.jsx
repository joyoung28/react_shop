import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Card, Row } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { continents, price } from "./Sections/Datas";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [categoryFilters, setCategoryFilters] = useState({
    continents: [],
    price: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: skip,
      limit: limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/products/products", body).then((res) => {
      if (res.data.success) {
        if (body.loadMore) {
          setProducts([...products, ...res.data.productInfo]);
        } else {
          // console.log(res.data.productInfo);
          setProducts(res.data.productInfo);
        }
        // console.log(res.data.postSize);
        setPostSize(res.data.postSize);
      } else {
        console.log(res.data.success);
      }
    });
  };

  const loadMordHandler = () => {
    let Skip = skip + limit;

    let body = {
      skip: Skip,
      limit: limit,
      loadMore: true,
    };
    getProducts(body);
    setSkip(Skip);
  };

  const { Meta } = Card;
  const renderCard = products.map((product) => {
    return (
      <Col lg={6} md={8} xs={24} key={product._id}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilterResults = (filters) => {
    let body = {
      skip: 0,
      limit: 8,
      filters: filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key].id === value) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...categoryFilters };
    newFilters[category] = filters;
    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
      // console.log(priceValues);
    }
    showFilterResults(newFilters);
    setCategoryFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: skip,
      limit: limit,
      filters: categoryFilters,
      searchTerm: newSearchTerm,
    };
    // console.log(newSearchTerm);
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

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
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* Filter */}
          <CheckBox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* RadioBox */}
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>

      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>
      {/* Cards */}
      <Row gutter={[16, 15]}>{renderCard}</Row>
      {postSize >= limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMordHandler}>더보기</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
