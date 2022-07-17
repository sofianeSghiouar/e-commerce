import OrdersServices from "../../services/ordersServices.js";
const ordersServices = new OrdersServices();

export default {
  Mutation: {
    orderCreation: (_, payload, context) => {
      console.log("context orderCreation :>> ", context.authScope);
      //   return ordersServices.createOrder(payload);
      return "ok";
    }
  }
};
