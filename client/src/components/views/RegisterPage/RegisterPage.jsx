import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router";

const RegisterPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("패스워드가 다릅니다.");
    } else {
      let body = {
        email: email,
        name: name,
        password: password,
      };

      dispatch(registerUser(body)).then((res) => {
        if (res.payload.success) {
          props.history.push("/login");
        } else {
          alert("회원가입에에 실패했습니다.");
        }
      });
    }
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
        <label>Name</label>
        <input type="text" value={name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="Password" value={password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="Password"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default withRouter(RegisterPage);
