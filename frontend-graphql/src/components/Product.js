import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import { useQuery } from '@apollo/client';

import Rating from './Rating';
import { Store } from '../Store';
import Queries from '../utils/graphql/gqlQueries';
import Loading from './Loading';
import Message from './Message';

function Product(props) {
  const { product } = props;
  const { state, dispatch: storeDispatch } = useContext(Store);
  const {
    cart: { cartItems }
  } = state;
  const gqlQuery = new Queries();

  const { loading, error, data } = useQuery(gqlQuery.GET_PRODUCTS);

  async function addToCartHandler(article) {
    if (data) {
      const { getProducts } = data;
      const currentProduct = getProducts.find(
        (product) => product.id === article.id
      );
      const alreadyInCart = cartItems.find((item) => item.id === article.id);
      const quantity = alreadyInCart ? alreadyInCart.quantity + 1 : 1;

      if (currentProduct.countInStock < article.quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
      const payload = { ...article, quantity };
      storeDispatch({ type: 'CART_ADD_ITEM', payload });
    }
  }
  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : error ? (
        <div>
          <Message variant='danger'>{error.message}</Message>
        </div>
      ) : (
        <Card>
          <Link to={`/product/${product.slug}`}>
            <Card.Img
              variant='top'
              src={product.image}
              className='card-img-top'
              alt={product.name}
            />
          </Link>
          <Card.Body className='product-info'>
            <Link to={`/product/${product.slug}`}>
              <Card.Title>{product.name}</Card.Title>
            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Card.Text>${product.price}</Card.Text>

            {product.countInStock === 0 ? (
              <Button variant='light' className='text-danger' disabled>
                Out of Stock
              </Button>
            ) : (
              <Button onClick={() => addToCartHandler(product)}>
                Add to Cart
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default Product;
