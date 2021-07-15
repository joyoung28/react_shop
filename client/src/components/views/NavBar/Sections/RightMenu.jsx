import React from "react";
import { Menu, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { USER_SERVER } from "../../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
const SubMenu = Menu.SubMenu;

const RightMenu = (props) => {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu style={{ display: "flex" }}>
        <Menu.Item key="upload">
          <a href="/product/upload">upload</a>
        </Menu.Item>
        <Menu.Item key="cart" style={{ paddingTop: 3 }}>
          <Badge count={5} style={{ marginRight: 15, marginTop: 8 }}>
            <a href="/user/cart" className="head-example">
              <ShoppingCartOutlined style={{ fontSize: 30, marginTop: 5 }} />
            </a>
          </Badge>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
};

export default withRouter(RightMenu);
