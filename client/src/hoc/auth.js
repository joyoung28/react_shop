import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    //option
    //null => 아무나 true=>로그인한 상태만 들어갈 수 있다. false=>로그인한 상태는 못들어간다.
    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res);
        //로그인안한 상태
        if (!res.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
          //로그인 한 상태
        } else {
          //관리자가 아닌 상태
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/");
          } else {
            //관리자인 상태, 로그인한상태로 못들어감.
            if (!option) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
