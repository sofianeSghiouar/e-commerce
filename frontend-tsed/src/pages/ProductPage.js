import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Card from 'react-bootstrap/esm/Card';
import Badge from 'react-bootstrap/esm/Badge';
import Button from 'react-bootstrap/esm/Button';
import Image from 'react-bootstrap/esm/Image';
import Rating from '../components/Rating';
import Loading from '../components/Loading';
import Message from '../components/Message';
import getErrorMessage from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductPage() {
  const navigate = useNavigate();
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: ''
  });
  const [isItemInCart, setIsItemInCart] = useState(false);
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(
          `http://localhost:8083/rest/products/${slug}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getErrorMessage(error) });
      }
    };
    fetchProducts();
  }, [slug]);

  const { state, dispatch: storeDispatch } = useContext(Store);
  const { cart } = state;

  const handleAddToCart = async () => {
    setIsItemInCart(true);
    console.log('cart productPage:>> ', cart);
    const alreadyInCart = cart.cartItems.find((item) => item.id === product.id);
    const quantity = alreadyInCart ? alreadyInCart.quantity + 1 : 1;
    const { data } = await axios.get(
      `http://localhost:8083/rest/products/${product.id}`
    );

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    const payload = { ...product, quantity };
    storeDispatch({
      type: 'CART_ADD_ITEM',
      payload
    });
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className='d-flex justify-content-around w-100'>
          <Col lg={6} className='d-flex flex-wrap'>
            {product.images.map((img) => (
              <Image
                fluid
                key={img}
                className={`${
                  product.images.length > 2 ? 'w-50' : 'w-100'
                } p-3`}
                src={img}
                alt={product.name}
              />
            ))}
          </Col>
          <Col md={4} lg={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4} lg={3}>
            <Card>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg='success'>In Stock</Badge>
                        ) : (
                          <Badge bg='danger'>Out Of Stock</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock === 0 && (
                    <ListGroup.Item>
                      <div className='d-grid'>
                        <Button variant='danger' disabled>
                          Add To Card
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className='d-grid'>
                        <Button onClick={handleAddToCart} variant='primary'>
                          Add To Card
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                  {isItemInCart && (
                    <ListGroup.Item>
                      <div className='d-grid'>
                        <Button
                          onClick={handleGoToCart}
                          bg='light'
                          variant='success'
                        >
                          Go To Card
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductPage;
