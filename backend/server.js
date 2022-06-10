import express from 'express';
import cors from 'cors';
import start from './dbStart.js';

import ProductModel from './models/product.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
});

app.get('/api/products/slug/:slug', async (req, res) => {
  const product = await ProductModel.findOne({ slug: req.params.slug });
  if (!product) {
    return res.status(404).json({ message: 'Product Not Found' });
  }
  res.json(product);
});
app.get('/api/products/:id', async (req, res) => {
  const product = await ProductModel.findById({ _id: req.params.id });
  if (!product) {
    return res.status(404).json({ message: 'Product Not Found' });
  }
  res.json(product);
});


const port = process.env.PORT || 8000;

start().then(() => {
  return app.listen(port, () => console.log('Server started at port:' + port));
});
