import { gql } from "@apollo/client";

export default class Mutation {
  ORDER_CREATION = gql`
    mutation OrderCreation($orderInput: OrderInput) {
      orderCreation(orderInput: $orderInput)
      #  {
      #   id
      #   orderItems {
      #     id
      #     slug
      #     name
      #     quantity
      #     image
      #     price
      #     product
      #   }
      #   shippingAddress {
      #     fullname
      #     address
      #     city
      #     postalCode
      #     country
      #   }
      #   itemsPrice
      #   taxPrice
      #   shippingPrice
      #   totalPrice
      #   paymentMethod
      #   user
      # }
    }
  `;
}
