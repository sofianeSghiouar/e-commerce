import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';

import Rating from './Rating';
import { Store } from '../Store';
import queryFetch from '../utils/queryHandler';

function Product(props) {
  const { product } = props;
  const { state, dispatch: storeDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  async function addToCartHandler(article) {
    const alreadyInCart = cartItems.find((item) => item._id === article._id);
    const quantity = alreadyInCart ? alreadyInCart.quantity + 1 : 1;
    const queryOptions = {
      query: `
      query ($id: ID!){
        getProductById(id: $id){
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
          reviews{
            createdAt
          }
          createdAt
        }       
      }
    `,
      variables: { id: article.id },
    };
    queryFetch(queryOptions)
      .then((result) => {
        const {
          data: {
            data: { getProductById },
          },
        } = result;
        if (getProductById) {
          if (getProductById.countInStock < article.quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
          }
          const payload = { ...article, quantity };
          storeDispatch({ type: 'CART_ADD_ITEM', payload });
        }
      })
      .catch((error) => error.message);
  }
  return (
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
          <Button onClick={() => addToCartHandler(product)}>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
