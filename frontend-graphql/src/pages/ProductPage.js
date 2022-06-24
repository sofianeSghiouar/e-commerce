import React, { useContext, useState } from 'react';
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
import { Store } from '../Store';
import { useQuery } from '@apollo/client';
import Queries from '../utils/graphql/gqlQueries';

function ProductPage() {
  const params = useParams();
  const { slug } = params;
  const gqlQuery = new Queries();
  const { loading, error, data } = useQuery(gqlQuery.GET_PRODUCTS);
  const { getProducts } = data;
  const currentProduct = getProducts.find((item) => item.slug === slug);
  const [product, setProduct] = useState(currentProduct || null);
  const [isItemInCart, setIsItemInCart] = useState(false);
  const navigate = useNavigate();

  const { state, dispatch: storeDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const handleAddToCart = async () => {
    setIsItemInCart(true);
    const alreadyInCart = cartItems.find((item) => item.id === product.id);
    const quantity = alreadyInCart ? alreadyInCart.quantity + 1 : 1;

    if (product.countInStock < product.quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    const payload = { ...product, quantity };
    storeDispatch({ type: 'CART_ADD_ITEM', payload });
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
