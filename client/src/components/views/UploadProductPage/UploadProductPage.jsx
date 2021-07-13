import React, { useState } from "react";
import { Typography, Button, Input, Form } from "antd";
import { withRouter } from "react-router";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

const UploadProductPage = (props) => {
  const [title, setTilte] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const tilteChangHandler = (e) => {
    setTilte(e.currentTarget.value);
  };
  const descriptionChangHandler = (e) => {
    setDescription(e.currentTarget.value);
  };
  const priceChangHandler = (e) => {
    setPrice(e.currentTarget.value);
  };
  const continentChangHandler = (e) => {
    setContinent(e.currentTarget.value);
  };

  const updateImages = (newImage) => {
    setImages(newImage);
  };

  const submitHandler = (e) => {
    // e.preventDefault();

    if (!title || !description || !price || !continent || !Images) {
      alert("모든 칸을 채우세요!");
    }
    const body = {
      writer: props.user.userData._id,
      title: title,
      description: description,
      price: price,
      continent: continent,
      images: Images,
    };

    axios.post("/api/products/upload", body).then((res) => {
      if (res.data.success) {
        alert("업로드에 성공했습니다.");
        props.history.push("/");
      } else {
        alert("업로드에 실패했습니다.");
        console.log(res.data);
      }
    });
  };

  const optionResult = Continents.map((item) => (
    <option key={item.key} value={item.key}>
      {item.value}
    </option>
  ));
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>
      <Form onFinish={submitHandler}>
        <FileUpload updateImages={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input value={title} onChange={tilteChangHandler} />
        <br />
        <br />
        <label>설명</label>
        <TextArea value={description} onChange={descriptionChangHandler} />
        <br />
        <br />
        <label>가격</label>
        <Input value={price} onChange={priceChangHandler} />
        <br />
        <br />
        <select value={continent} onChange={continentChangHandler}>
          {optionResult}
        </select>
        <br />
        <br />
        <Button htmlType="submit">확인</Button>
      </Form>
    </div>
  );
};

export default withRouter(UploadProductPage);
