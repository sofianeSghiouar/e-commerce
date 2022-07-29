import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Row, Col, Card, ListGroup, Image } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Store } from "../Store";
import getErrorMessage from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_FETCH":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default: {
      return state;
    }
  }
};

function OrderPage() {
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    order: {}
  });

  const { state, dispatch: storeDispatch } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderIdFromParams } = params;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      return navigate("/login");
    }
    const fetchOrder = async () => {
      dispatch({ type: "CREATE_FETCH" });
      try {
        const { data } = await axios.get(
          `http://localhost:8001/api/order/${orderIdFromParams}`,
          {
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${userInfo.token}`
            }
          }
        );
        console.log("data :>> ", data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getErrorMessage(error)
        });
        // set a toast error
        console.log(error);
      }
    };
    if (!order._id || (order._id && order._id !== orderIdFromParams)) {
      fetchOrder();
    }
  }, [userInfo, order, orderIdFromParams, navigate]);

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <h1>Order {orderIdFromParams}</h1>
      <Row className="mt-5">
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping address</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.postalCode} {order.shippingAddress.city}{" "}
                <br />
                <strong>Country:</strong> {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <Message variant="success">Delivered</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Payment Method</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <Message variant="success">Paid</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center justify-content-between">
                        <Col md={6}>
                          {" "}
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            thumbnail
                            fluid
                          />{" "}
                          {item.name}
                        </Col>
                        <Col>{item.quantity}</Col>
                        <Col>${item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Items</strong>
                    </Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Shipping</strong>
                    </Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Tax</strong>
                    </Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderPage;
