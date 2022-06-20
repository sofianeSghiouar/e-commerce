import productResolvers from './products.js';
import userResolvers from './users.js';

export default {
  Query: { 
    ...productResolvers.Query,
     ...userResolvers.Query 
    },
};
