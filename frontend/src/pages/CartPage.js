import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Button,
  Card
} from 'react-bootstrap/esm';

import { Store } from '../Store';
import Message from '../components/Message';

function CartPage() {
  const { state, dispatch: storeDispatch } = useContext(Store);
  const {
    cart: { cartItems }
  } = state;
  const navigate = useNavigate();

  async function updateCartHandler(item, quantity) {
    const { data } = await axios.get(
      `http://localhost:8000/api/products/${item._id}`
    );
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    storeDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity }
    });
  }

  function removeItemHandler(item) {
    storeDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  }

  function checkoutHandler() {
    navigate('/login?redirect=/shipping');
  }

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        {cartItems.length === 0 ? (
          <Message>
            Cart is empty. <Link to={'/'}>Go Shopping</Link>{' '}
          </Message>
        ) : (
          <Col md={8}>
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row className='align-items-center'>
                    <Col md={4}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        rounded
                        thumbnail
                        fluid
                      />{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant='light'
                        disabled={item.quantity === 1}
                      >
                        <i className='typcn typcn-minus' />
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        variant='light'
                      >
                        <i className='typcn typcn-plus' />
                      </Button>
                    </Col>
                    <Col md={3}>
                      <span>${item.price}</span>
                    </Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant='light'
                      >
                        <i className='typcn typcn-trash' />
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
              <Card.Body>
                <ListGroup>
                  <ListGroupItem>
                    <h3>
                      Number of acticles:{' '}
                      {cartItems.reduce((a, c) => {
                        return a + c.quantity;
                      }, 0)}
                    </h3>
                    <h3>
                      Total: $
                      {cartItems.reduce((a, c) => {
                        return a + c.price * c.quantity;
                      }, 0)}{' '}
                    </h3>
                  </ListGroupItem>
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button
                        variant={`${
                          cartItems.length === 0 ? 'dark' : 'primary'
                        }`}
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                      >
                        Proceed to checkout
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default CartPage;
