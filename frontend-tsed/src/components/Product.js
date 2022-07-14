import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";

import Rating from "./Rating";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;
  const { state, dispatch: storeDispatch } = useContext(Store);
  const {
    cart: { cartItems }
  } = state;

  async function addToCartHandler(article) {
    const alreadyInCart = cartItems.find((item) => item.id === article.id);

    const quantity = alreadyInCart ? alreadyInCart.quantity + 1 : 1;
    const { data } = await axios.get(
      `http://localhost:8083/rest/products/${article.id}`
    );
    if (data.countInStock < article.quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    const payload = { ...article, quantity };
    storeDispatch({ type: "CART_ADD_ITEM", payload });
  }
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <Card.Img
          variant="top"
          src={product.image}
          className="card-img-top"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title className="product-info">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>

        {product.countInStock === 0 ? (
          <Button variant="light" className="text-danger" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button variant="dark" onClick={() => addToCartHandler(product)}>
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
