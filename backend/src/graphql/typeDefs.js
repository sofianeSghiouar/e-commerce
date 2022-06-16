import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Product {
    name: String
    slug: String
    image: String
    images: [String]
    brand: String
    category: String
    description: String
    price: Number
    countInStock: Number
    rating: Number
    numReviews: Number
    reviews: Reviews
    timestamps: String
  }

  type Reviews {
    name: String
    comment: String
    rating: Number
    timestamps: String
  }
  type User {
    username: String
    email: String
    password: String
    isAdmin: Boolean
    timestamps: String
  }
`;

