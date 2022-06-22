import React, { useEffect, useReducer } from 'react';
// import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';

import Product from '../components/Product';
import Loading from '../components/Loading';
import Message from '../components/Message';
import queryFetch from '../utils/queryHandler';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    // wrap reducer in logger() for steps infos
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      const queryOptions = {
        query: `
        query{
          getProducts {
            id
            name
            slug
            image
            images
            brand
            category
            description
            price
            countInStock
            rating
            numReviews
            reviews {
              createdAt
            }
            createdAt
          }
        }          
          `,
      };
      queryFetch(queryOptions)
        .then((result) => {
          const {
            data: {
              data: { getProducts },
            },
          } = result;
          if (getProducts) {
            return dispatch({ type: 'FETCH_SUCCESS', payload: getProducts });
          }
          dispatch({ type: 'FETCH_FAIL', payload: result.error.message });
        })
        .catch((error) => error.message);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>The Good Deals</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className='products'>
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : error ? (
          <div>
            <Message variant='danger'>{error}</Message>
          </div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
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
