import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

function PaymentMethodPage() {
  const { state, dispatch: storeDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod }
  } = state;
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'Paypal'
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault(e);
    storeDispatch({ type: 'SAVE_SHIPPING_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className='container small-container'>
        <Helmet>
          <title>Payment</title>
        </Helmet>
        <h1 className='my-3'>Payment</h1>
        <Form onSubmit={submitHandler}>
          <Form.Check
            type='radio'
            id='Paypal'
            label='Paypal'
            value='Paypal'
            checked={paymentMethodName === 'Paypal'}
            onChange={(e) => {
              setPaymentMethodName(e.target.value);
            }}
          />
        </Form>
        <Form onSubmit={submitHandler}>
          <Form.Check
            type='radio'
            id='Credit card'
            label='Credit card'
            value='Credit card'
            checked={paymentMethodName === 'Credit card'}
            onChange={(e) => {
              setPaymentMethodName(e.target.value);
            }}
          />
          <Button className='mt-3' type='submit'>
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default PaymentMethodPage;
