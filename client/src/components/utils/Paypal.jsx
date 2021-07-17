import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export default class Paypal extends React.Component {
  render() {
    const onSuccess = (payment) => {
      console.log("The payment was succeeded!", payment);
      this.props.onSuccess(payment);
    };

    const onCancel = (data) => {
      console.log("The payment was cancelled!", data);
    };

    const onError = (err) => {
      console.log("Error!", err);
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.total;

    const client = {
      sandbox:
        "AQl2T6ltpUwR9SerjfYnleBWPS0TDzb7hU5jG5i1gFUkq2D9PCgBMWgVjy7cKDwnRgLpF_GHb90Xx8qT",
      production: "YOUR-PRODUCTION-APP-ID",
    };
    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            label: "checkout",
          }}
        />
      </div>
    );
  }
}
