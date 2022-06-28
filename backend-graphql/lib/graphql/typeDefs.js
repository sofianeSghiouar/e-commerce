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
    id: ID!
    username: String!
    email: String!
    isAdmin: Boolean!
    createdAt: String!
  }
  type UserLogin {
    id: ID!
    username: String!
    email: String!
    isAdmin: Boolean!
    token: String!
    createdAt: String!
  }
  type UserRegister {
    id: ID!
    username: String!
    email: String!
    isAdmin: Boolean!
    createdAt: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getProducts: [Product]!
    getProductById(id: ID!): Product!
    getProductBySlug(slug: String!): Product!
  }
  type Mutation {
    userLogin(loginInput: LoginInput): UserLogin
    userRegister(registerInput: RegisterInput): UserRegister
  }
`;
export default typeDefs;