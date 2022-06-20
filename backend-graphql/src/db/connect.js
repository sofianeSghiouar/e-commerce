import mongoose from 'mongoose';

import data from '../data.js';
import ProductsModel from '../models/product.js';
import UsersModel from '../models/user.js';

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => {
      console.log('database connected');
    })    
  } catch (error) {
    throw new Error(error.message)
  }
};

export default start;
