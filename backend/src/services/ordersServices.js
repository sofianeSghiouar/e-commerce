import OrderModel from '../models/order.js';

export default class OrdersServices {
  async createOrder(user, body, res) {
    const orderItems = body.orderItems.map((item) => {
      return {
        slug: item.slug,
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
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
}
