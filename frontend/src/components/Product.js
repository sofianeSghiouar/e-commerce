import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import Rating from './Rating';

function Product({ product }) {
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <Card.Img variant="top" src={product.images[0]} className='card-img-top' alt={product.name} />
      </Link>
      <Card.Body className='product-info'>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <Button variant='primary'>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
