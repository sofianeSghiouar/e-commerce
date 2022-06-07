import express from 'express';
import cors from 'cors';
import data from './data.js';

const app = express();
app.use(cors());

app.get('/api/products', (req, res) => {
  res.json(data.products);
});
app.get('/api/products/slug/:slug', (req, res) => {
  // console.log('req.params', req.params)
  const product = data.products.find((product) => {
    return product.slug === req.params.slug;
  });
  if (!product) {
    return res.status(404).json({ message: 'Product Not Found' });
  }
  res.json(product);
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((product) => {
    return product._id === req.params.id;
  });
  if (!product) {
    return res.status(404).json({ message: 'Product Not Found' });
  }
  res.json(product);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('Server started at port:' + port));
