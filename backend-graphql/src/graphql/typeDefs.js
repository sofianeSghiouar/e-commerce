import { gql } from 'apollo-server';

const typeDefs = gql`
  type Reviews {
    name: String
    comment: String
    rating: Float
    createdAt: String
  }
  type Product {
    id: ID!
    name: String!
    slug: String!
    image: String!
    images: [String]!
    brand: String!
    category: String!
    description: String!
    price: Int!
    countInStock: Int!
    rating: Float!
    numReviews: Int!
    reviews: Reviews!
    createdAt: String!
  }
  type User {
    username: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    createdAt: String!
  }
  type Query {
    getProducts: [Product]
    getProductById(id: ID!): Product
    getProductBySlug(slug: String): Product
    getUser(email: String, password: String): User
  }
`;

export default typeDefs;
