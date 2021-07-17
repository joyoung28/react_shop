import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCartItem,
  removeCartItem,
  onSuccessBuy,
} from "../../../_actions/user_action";
import UserCardBlock from "./Sections/UserCardBlock";
import { Empty, Result } from "antd";
import Paypal from "../../utils/Paypal";

const CartPage = ({ user }) => {
  const [Total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let cartItem = [];

    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItem.push(item.id);
        });
        dispatch(getCartItem(cartItem, user.userData.cart)).then((res) => {
          console.log(calculateTotal(res.payload));
        });
      }
    }
  }, [user.userData]);

  let calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity; //item.price를 10진수로 변환
    });
    setShowTotal(true);
    setTotal(total);
  };

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((res) => {
      if (res.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  const transactionSuccess = (data) => {
    dispatch(
      onSuccessBuy({
        paymentData: data,
        cartDetail: user.cartDetail,
      })
    ).then((res) => {
      if (res.payload.success) {
        console.log(res.payload);
        setShowTotal(false);
        setShowSuccess(true);
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={user.cartDetail}
          removeFromCart={removeFromCart}
        />
      </div>
      {showTotal ? (
        <div style={{ marginTop: "3rem" }}>
          <h2>total Amount: ${Total}</h2>
        </div>
      ) : showSuccess ? (
        <Result status="success" title="Successfully Purchased Items!" />
      ) : (
        <>
          <br />
          <Empty style={{ marginTop: "20px" }} />
        </>
      )}

      {showTotal && <Paypal total={Total} onSuccess={transactionSuccess} />}
    </div>
  );
};

export default CartPage;
