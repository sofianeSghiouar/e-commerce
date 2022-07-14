import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../Store";

function PaymentMethodPage() {
  const { state, dispatch: storeDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod }
  } = state;
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Paypal"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault(e);
    console.log("submit handler:>> ", e);
    storeDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment</title>
        </Helmet>
        <h1 className="my-3">Payment</h1>
        <Form onSubmit={submitHandler}>
          <Form.Check
            type="radio"
            id="Paypal"
            label="Paypal"
            value="Paypal"
            checked={paymentMethodName === "Paypal"}
            onChange={(e) => setPaymentMethodName(e.target.value)}
          />
        </Form>
        <Form onSubmit={submitHandler}>
          <Form.Check
            type="radio"
            id="Credit Card"
            label="Credit Card"
            value="Credit Card"
            checked={paymentMethodName === "Credit Card"}
            onChange={(e) => setPaymentMethodName(e.target.value)}
          />
          <Button type="submit" className="mt-3">
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default PaymentMethodPage;
