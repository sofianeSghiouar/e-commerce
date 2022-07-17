// import OrderModel from "../models/order.js";
// import UserModel from "../models/user.js";
// import verifyToken from "../utils/verifyToken.js";

export default class OrdersServices {
  createOrder = async (orderInput) => {
    //TODO decode the token in headers authorisazion Bearer

    // const user = await verifyToken(orderInput.token);
    // try {
    //   const orderItems = orderInput.orderItems.map((item) => {
    //     return {
    //       slug: item.slug,
    //       name: item.name,
    //       quantity: item.quantity,
    //       image: item.image,
    //       price: item.price,
    //       product: item._id
    //     };
    //   });
    //   const {
    //     shippingAddress,
    //     paymentMethod,
    //     itemsPrice,
    //     shippingPrice,
    //     taxPrice,
    //     totalPrice
    //   } = orderInput;

    //   const order = new OrderModel({
    //     orderItems,
    //     shippingAddress,
    //     paymentMethod,
    //     itemsPrice,
    //     shippingPrice,
    //     taxPrice,
    //     totalPrice
    //     // user: user._id
    //   });
    //   console.log("order :>> ", order);
    // const newOrder = await order.save();
    console.log("orderInput :>> ", orderInput);
    return "test order service";
    // } catch (error) {
    //   throw new Error(error);
    // }
  };
}
