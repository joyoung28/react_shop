import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router";

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: password,
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("로그인에 실패했습니다.");
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
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="Password" value={password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default withRouter(LoginPage);
