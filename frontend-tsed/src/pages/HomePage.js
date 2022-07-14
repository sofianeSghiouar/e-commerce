import React, { useEffect, useReducer } from "react";
import axios from "axios";
<<<<<<< HEAD
=======
// import logger from 'use-reducer-logger';
>>>>>>> 67c2e32 (ci: refactor place order page, now manage order cost from backend)
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet-async";

import Product from "../components/Product";
import Loading from "../components/Loading";
import Message from "../components/Message";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: ""
  });

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("http://localhost:8083/rest/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
<<<<<<< HEAD
=======
        console.log("result :>> ", result);
>>>>>>> 67c2e32 (ci: refactor place order page, now manage order cost from backend)
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>The Good Deals</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products mt-5">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : error ? (
          <div>
            <Message variant="danger">{error}</Message>
          </div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
}

export default HomePage;
