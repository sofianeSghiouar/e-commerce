import productResolvers from "./products.js";
import userResolvers from "./users.js";
import orderResolvers from "./order.js";

export default {
  Query: {
    ...productResolvers.Query
    //  ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...orderResolvers.Mutation
  }
};
