import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Button,
  Card
} from "react-bootstrap/esm";
import { useQuery } from "@apollo/client";

import { Store } from "../Store";
import Message from "../components/Message";
import { Queries } from "../utils/graphql/gqlQueries";
import Loading from "../components/Loading";

function CartPage() {
  const gqlQuery = new Queries();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const {
    cart: { cartItems }
  } = state;
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(gqlQuery.GET_PRODUCTS);

  async function updateCartHandler(item, quantity) {
    if (data) {
      const { getProducts } = data;
      const currentItem = getProducts.find((product) => product.id === item.id);
      if (currentItem.countInStock < quantity) {
        window.alert("Sorry. Product is out of stock");
        return;
      }
    }
    storeDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity }
    });
  }
  function removeItemHandler(item) {
    storeDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  }

  function checkoutHandler() {
    navigate("/login?redirect=/shipping");
  }

  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : error ? (
        <div>
          <Message variant="danger">{error.message}</Message>
        </div>
      ) : (
        <div>
          <Helmet>
            <title>Shopping Cart</title>
          </Helmet>
          <h1>Shopping Cart</h1>
          <Row>
            {cartItems.length === 0 ? (
              <Message>
                Cart is empty. <Link to={"/"}>Go Shopping</Link>{" "}
              </Message>
            ) : (
              <Col md={8}>
                <ListGroup>
                  {cartItems.map((item) => (
                    <ListGroupItem key={item.id}>
                      <Row sm={4} className="align-items-center">
                        <Col lg={5} md={3} sm={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            thumbnail
                            fluid
                          />{" "}
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={2} sm={2}>
                          <span>${item.price}</span>
                        </Col>
                        <Col md={4} lg={3} sm={3}>
                          <Button
                            onClick={() =>
                              updateCartHandler(item, item.quantity - 1)
                            }
                            variant="light"
                            disabled={item.quantity === 1}
                          >
                            <i className="typcn typcn-minus" />
                          </Button>{" "}
                          <span>{item.quantity}</span>{" "}
                          <Button
                            onClick={() =>
                              updateCartHandler(item, item.quantity + 1)
                            }
                            variant="light"
                          >
                            <i className="typcn typcn-plus" />
                          </Button>
                        </Col>
                        <Col md={2}>
                          <Button
                            onClick={() => removeItemHandler(item)}
                            variant="light"
                          >
                            <i className="typcn typcn-trash" />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
            )}
            {cartItems.length > 0 && (
              <Col md={4}>
                <Card>
                  <ListGroup>
                    <ListGroupItem>
                      <h3>
                        Number of acticles:{" "}
                        {cartItems.reduce((a, c) => {
                          return a + c.quantity;
                        }, 0)}
                      </h3>
                      <h3>
                        Total: $
                        {cartItems.reduce((a, c) => {
                          return a + c.price * c.quantity;
                        }, 0)}{" "}
                      </h3>
                    </ListGroupItem>
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          className="mb-2"
                          variant="primary"
                          onClick={checkoutHandler}
                        >
                          Proceed to checkout
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => navigate("/")}
                        >
                          Continue Shopping
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            )}
          </Row>
        </div>
      )}
    </div>
  );
}

export default CartPage;
