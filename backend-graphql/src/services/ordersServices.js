import { UserInputError } from "apollo-server";
// import OrderModel from "../models/order.js";
// import UserModel from "../models/user.js";
import verifyToken from "../utils/verifyToken.js";

export default class OrdersServices {
  createOrder = async ({ args: { orderInput }, context }) => {
    console.log("context order service  :>> ", context);
    console.log("orderInput order service  :>> ", orderInput);

    //TODO decode the token in headers authorisazion Bearer
    if (context.authScope) {
      const token = context.authScope.split(" ")[1];
      const user = await verifyToken(token);
      if (!user) {
        throw new UserInputError("UnAuthorize");
      }
    }
    try {
      // const orderItems = orderInput.orderItems.map((item) => {
      //   return {
      //     slug: item.slug,
      //     name: item.name,
      //     quantity: item.quantity,
      //     image: item.image,
      //     price: item.price,
      //     product: item.id
      //   };
      // });
      console.log("orderInput order service  :>> ", orderInput);
      // const {
      //   shippingAddress,
      //   paymentMethod,
      //   itemsPrice,
      //   shippingPrice,
      //   taxPrice,
      //   totalPrice
      // } = orderInput;

      // const order = new OrderModel({
      //   orderItems,
      //   shippingAddress,
      //   paymentMethod,
      //   itemsPrice,
      //   shippingPrice,
      //   taxPrice,
      //   totalPrice
      //   // user: user.id
      // });
      // const newOrder = await order.save();
      return "test order services";
    } catch (error) {
      throw new Error(error);
    }
  };
}
