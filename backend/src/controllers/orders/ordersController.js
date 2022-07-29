import OrdersServices from "../../services/ordersServices.js";

export default class OrdersController {
  ordersServices = new OrdersServices();

  async handleCreateOrder({ user, body }) {
    const createOrder = await this.ordersServices.createOrder(user, body);
    return createOrder;
  }
  async handleGetOrderById({ params: { id } }, res) {
    const order = await this.ordersServices.getOrderById(id);
    return order;
  }
}
