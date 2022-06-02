import express from 'express';
import cors from 'cors';
import data from './data.js';

const app = express();
app.use(cors());

app.get('/api/products', (req, res) => {
  res.json(data.products);
});
app.get('/api/products/:slug', (req, res) => {
  const product = data.products.find(product=>{   
    return product.slug === req.params.slug
  })
  if(!product){
    return res.status(404).json({message: 'product not found'})
  }
  res.json(product);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('server stated at port:' + port));
