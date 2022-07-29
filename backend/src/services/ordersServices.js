import OrderModel from "../models/order.js";

export default class OrdersServices {
  async createOrder(user, body) {
    const orderItems = body.orderItems.map((item) => {
      return {
        ...item,
        product: item._id
      };
    });

    const {
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    } = body;
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
    return { order: newOrder };
  }
  async getOrderById(id) {
    const order = await OrderModel.findById(id);
    if (order) {
      return order;
    }
    throw new Error({ message: "Order Not Found" });
  }
}
