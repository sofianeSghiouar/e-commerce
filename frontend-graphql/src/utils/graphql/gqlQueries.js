import { gql } from "@apollo/client";

export class Queries {
  GET_PRODUCTS = gql`
    query {
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
  `;
}
