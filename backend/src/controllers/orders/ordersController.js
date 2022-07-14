import OrdersServices from "../../services/ordersServices.js";

export default class OrdersController {
  ordersServices = new OrdersServices();

  async handleCreateOrder({ user, body }, res) {
    const createOrder = await this.ordersServices.createOrder(user, body, res);
    return createOrder;
  }
}
