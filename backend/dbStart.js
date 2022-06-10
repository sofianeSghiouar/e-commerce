import mongoose from 'mongoose';
import data from './data.js';
import ProductModel from './models/product.js';

const start = () => {
  return mongoose
    .connect(
      'mongodb+srv://thegooddeal:JtiMPgFBGQ6yY0MS@thegooddeal.rmmdg.mongodb.net/thegoodplan?retryWrites=true&w=majority',
      { useNewUrlParser: true }
    )
    .then(async () => {
      if ((await ProductModel.countDocuments()) < 1) {
        data.products.map(async (product) => {
          await ProductModel.create(product);
        });
      }
      console.log('database connected');
    });
};

export default start;
