import { gql } from "apollo-server";

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
  type OrderItems {
    id: ID!
    slug: String!
    name: String!
    quantity: Int!
    image: String!
    price: Int!
    product: ID!
  }
  type ShippingAddress {
    fullname: String!
    address: String!
    city: String!
    postalCode: String!
    country: String!
  }
  type PaymentResult {
    id: String
    status: String
    update_time: String
    email_address: String
  }
  type Order {
    id: ID!
    orderItems: [OrderItems]!
    shippingAddress: ShippingAddress!
    itemsPrice: Int!
    taxPrice: Int!
    shippingPrice: Int!
    totalPrice: Int!
    paymentMethod: String!
    paymentResult: PaymentResult
    user: ID!
    isPaid: Boolean
    paidAt: String
    isDelivered: Boolean
    deliveredAt: String
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
  input OrderItemsInput {
    id: ID!
    slug: String!
    name: String!
    quantity: Int!
    image: String!
    price: Int!
    # product: ID
  }
  input ShippingAddressInput {
    fullname: String!
    address: String!
    city: String!
    postalCode: String!
    country: String!
  }
  input OrderInput {
    orderItems: [OrderItemsInput]!
    shippingAddress: ShippingAddressInput!
    itemsPrice: Int!
    taxPrice: Int!
    shippingPrice: Int!
    totalPrice: Int!
    paymentMethod: String!
  }

  type Query {
    getProducts: [Product]!
    getProductById(id: ID!): Product!
    getProductBySlug(slug: String!): Product!
  }
  type Mutation {
    userLogin(loginInput: LoginInput): UserLogin
    userRegister(registerInput: RegisterInput): UserRegister
    orderCreation(orderInput: OrderInput): Order
  }
`;

export default typeDefs;
