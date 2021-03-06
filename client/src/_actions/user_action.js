import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_CART,
  LOGOUT_USER,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
} from "./types";
import { USER_SERVER } from "../Config";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((res) => res.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get("/api/users/auth").then((res) => res.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function addToCart(id) {
  let body = {
    productId: id,
  };
  const request = axios
    .post(`${USER_SERVER}/addToCart`, body)
    .then((res) => res.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getCartItem(cartItems, userCart) {
  const request = axios
    .get(`/api/products/products_by_id?id=${cartItems}&type=array`)
    .then((res) => {
      userCart.forEach((cartItem) => {
        res.data.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            res.data[index].quantity = cartItem.quantity;
          }
        });
      });
      return res.data;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}

export function removeCartItem(productId) {
  const request = axios
    .get(`/api/users/removeFromCart?id=${productId}`)
    .then((res) => {
      res.data.cart.forEach((item) => {
        res.data.productInfo.forEach((product, index) => {
          if (item.id === product._id) {
            res.data.productInfo[index].quantity = item.quantity;
          }
        });
      });

      return res.data;
    });
  return {
    type: REMOVE_CART_ITEM,
    payload: request,
  };
}

export function onSuccessBuy(data) {
  const request = axios
    .post("/api/users/successBuy", data)
    .then((res) => res.data);

  return {
    type: ON_SUCCESS_BUY,
    payload: request,
  };
}
