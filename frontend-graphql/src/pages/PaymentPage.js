import React from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentPage() {
  return (
    <div>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className='container small-container'>
        <h1 className='my-3'>Payment</h1>
      </div>
    </div>
  );
}

export default PaymentPage;
