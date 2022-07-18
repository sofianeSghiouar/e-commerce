import { gql } from "@apollo/client";

export default class Mutation {
  ORDER_CREATION = gql`
    mutation OrderCreation($orderInput: OrderInput) {
      orderCreation(orderInput: $orderInput) {
        _id
        orderItems {
          slug
          name
          quantity
          image
          price
          product
        }
        shippingAddress {
          fullName
          address
          city
          postalCode
          country
        }
        itemsPrice
        taxPrice
        shippingPrice
        totalPrice
        paymentMethod
        user
      }
    }
  `;
}
