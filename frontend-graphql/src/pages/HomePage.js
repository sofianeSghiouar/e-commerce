// import React, { useEffect, useReducer } from 'react';
// import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';

import Product from '../components/Product';
import Loading from '../components/Loading';
import Message from '../components/Message';
// import queryFetch from '../utils/queryHandler';

// const reducer = (state, action) => {
//   switch (action.type) {
// case 'FETCH_REQUEST':
//   return { ...state, loading: true };
// case 'FETCH_SUCCESS':
// return { ...state, products: action.payload };
// return { ...state, products: action.payload, loading: false };
// case 'FETCH_FAIL':
//   return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
import Queries from '../utils/graphql/gqlQueries';


function HomePage() {
  const gqlQuery = new Queries();
  const { loading, error, data } = useQuery(gqlQuery.GET_PRODUCTS);

  // useEffect(() => {
  //   // const fetchProducts = async () => {
  //   //   dispatch({ type: 'FETCH_REQUEST' });
  //   //   const queryOptions = {
  //   //     query: `
  //   //     query{
  //   //       getProducts {
  //   //         id
  //   //         name
  //   //         slug
  //   //         image
  //   //         images
  //   //         brand
  //   //         category
  //   //         description
  //   //         price
  //   //         countInStock
  //   //         rating
  //   //         numReviews
  //   //         reviews {
  //   //           createdAt
  //   //         }
  //   //         createdAt
  //   //       }
  //   //     }
  //   //       `,
  //   //   };
  //   //   queryFetch(queryOptions)
  //   //     .then((result) => {
  //   //       if (result.hasOwnProperty('data')) {
  //   //         console.log('result :>> ', result);
  //   //         const {
  //   //           data: {
  //   //             data: { getProducts },
  //   //           },
  //   //         } = result;
  //   //         if (getProducts) {
  //   //           return dispatch({ type: 'FETCH_SUCCESS', payload: getProducts });
  //   //         }
  //   //       }
  //   //       throw new Error(result.message);
  //   //     })
  //   //     .catch((error) => {
  //   //       dispatch({ type: 'FETCH_FAIL', payload: error.message });
  //   //     });
  //   // };
  //   // fetchProducts();
  // }, []);


  return (
    <Container>
      <Helmet>
        <title>The Good Deals</title>
      </Helmet>
      <h1>New Products</h1>
      <div className='products'>
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : error ? (
          <div>
            <Message variant='danger'>{error.message}</Message>
          </div>
        ) : (
          <Row>
            {data.getProducts.map((product) => (
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
