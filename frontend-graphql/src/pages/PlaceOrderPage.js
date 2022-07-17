import React, { useContext } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../Store";
import gqlMutations from "../utils/graphql/gqlMutations";
import { useMutation } from "@apollo/client";

function PlaceOrderPage() {
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, cartItems, paymentMethod } = cart;

  const round2 = (num) => {
    return Math.round(num * 100 + Number.EPSILON) / 100;
  };
  cart.itemsPrice = round2(
    cartItems.reduce((a, b) => {
      return a + b.price * b.quantity;
    }, 0)
  );
  cart.shippingPrice = round2(cart.itemsPrice > 50 ? 0 : 12);
  cart.taxPrice = round2(cart.itemsPrice * (19.6 / 100));
  cart.totalPrice = round2(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  );
  console.log("cartItems", cartItems);
  const mutations = new gqlMutations();
  const [orderCreation] = useMutation(mutations.ORDER_CREATION, {
    variables: {
      orderItems: cartItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      taxPrice: cart.taxPrice,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice
    },
    onCompleted: ({ orderCreation }) => {
      console.log("data useMutation() ==:>> ", orderCreation);
    }
  });

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Helmet>
        <title>Place order</title>
      </Helmet>
      <h1 className="my-5">Order Summary</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <ListGroup>
                <ListGroupItem className="border-0 p-0">
                  <strong>Name: </strong>
                  {shippingAddress.fullName}
                </ListGroupItem>
                <ListGroupItem className="border-0 p-0">
                  <strong>Address: </strong>
                  {shippingAddress &&
                    `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
                </ListGroupItem>
                <ListGroupItem className="border-0 p-0 mt-3">
                  <Link to="/cart">Edit</Link>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>

              <ListGroup>
                <ListGroupItem className="p-0">
                  <strong>Method: </strong>
                  {paymentMethod && paymentMethod}
                </ListGroupItem>
                <ListGroupItem className="p-0 mt-3">
                  <Link to="/payment">Edit</Link>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cartItems &&
                  cartItems.map((item) => (
                    <ListGroupItem key={item.id} className="px-0">
                      <Row className="align-items-center">
                        <Col md={6} sm={5}>
                          <Image
                            className="me-2"
                            src={item.image}
                            alt={item.name}
                            rounded
                            thumbnail
                          />
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>
                          <span>${item.price}</span>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                <ListGroupItem className="p-0 mt-3">
                  <Link to="/cart">Edit</Link>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <div className="d-grid">
            <Button
              type="button"
              disabled={cartItems.length === 0}
              className="mt-3"
              onClick={() => orderCreation()}
            >
              Continue
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderPage;
