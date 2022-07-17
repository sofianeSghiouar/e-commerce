import OrdersServices from "../../services/ordersServices.js";
const ordersServices = new OrdersServices();

export default {
  Mutation: {
    orderCreation: (_, payload, context) => {
      console.log("context orderCreation :>> ", context.authScope);
      const result = ordersServices.createOrder(payload);
      console.log("result :>> ", result);
      return "test";
    }
  }
};
