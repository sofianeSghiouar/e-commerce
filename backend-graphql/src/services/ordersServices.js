import {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from "apollo-server";
import OrderModel from "../models/order.js";
import verifyToken from "../utils/verifyToken.js";

export default class OrdersServices {
  createOrder = async ({ args: { orderInput }, context }) => {
    if (context.authScope) {
      try {
        const token = context.authScope.split(" ")[1];
        const user = await verifyToken(token);
        if (!user) {
          throw new AuthenticationError("UnAuthorize");
        }
        const orderItems = orderInput.orderItems.map((item) => {
          return {
            slug: item.slug,
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            product: item.id
          };
        });
        const {
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice
        } = orderInput;

        const order = new OrderModel({
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
          user: user._id
        });
        const newOrder = await order.save();
        console.log("newOrder :>> ", newOrder);
        return newOrder;
      } catch (error) {
        throw new UserInputError(error);
      }
    }
    throw new ForbiddenError("UnAuthorize");
  };
}
