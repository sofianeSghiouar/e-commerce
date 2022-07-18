import OrdersServices from "../../services/ordersServices.js";
const ordersServices = new OrdersServices();

export default {
  Mutation: {
    orderCreation: async (parent, args, context) => {
      return await ordersServices.createOrder({ args, context });
    }
  }
};
