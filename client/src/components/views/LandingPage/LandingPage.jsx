import axios from "axios";
import React from "react";
import { withRouter } from "react-router";

const LandingPage = (props) => {
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data) {
        props.history.push("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      LandingPage
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
};

export default withRouter(LandingPage);
