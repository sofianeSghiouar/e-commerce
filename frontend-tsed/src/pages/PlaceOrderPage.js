import axios from "axios";
import React, { useEffect } from "react";
import { useReducer } from "react";
import { useContext } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../Store";
import getErrorMessage from "../utils";
import Loading from "../components/Loading";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function PlaceOrderPage() {
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false
  });
  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, b) => {
      return a + b.price * b.quantity;
    }, 0)
  );
  cart.shippingPrice = round2(cart.itemsPrice > 50 ? 0 : 12);
  cart.taxPrice = round2(cart.itemsPrice * (19.6 / 100));
  cart.totalPrice = round2(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  );

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
      return;
    }
  }, [cart, navigate]);

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "http://localhost:8083/rest/order",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          itemsPrice: cart.itemsPrice,
          totalPrice: cart.totalPrice
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${userInfo.token}`
          }
        }
      );
      // storeDispatch({ type: 'CART_CLEAR' });
      // dispatch({ type: 'CREATE_SUCCESS' });
      // localStorage.removeItem('cartItems');
      console.log("data :>> ", data);
      // navigate(`/order/${data.order._id}`);
    } catch (error) {
      dispatch({ type: "CREATE_FAIL" });
      console.log("error :>> ", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Helmet>
        <title>Order Summary</title>
      </Helmet>
      <h1 className="my-3">Order Summary</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cart.paymentMethod}
              </Card.Text>
              <Link to="/placeorder">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroupItem key={item.id}>
                    <Row className="align-items-center">
                      <Col md={6} sm={5}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          rounded
                          thumbnail
                          fluid
                        />{" "}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3} sm={2}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3} sm={3}>
                        <span>${item.price}</span>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            {/* <Card.Title>Order Summary</Card.Title> */}
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Order Total</strong>
                  </Col>
                  <Col>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <div className="d-grid">
            <Button
              type="button"
              disabled={cart.cartItems.length === 0}
              className="mt-3"
              onClick={placeOrderHandler}
            >
              Continue
            </Button>
            {loading && <Loading />}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderPage;
