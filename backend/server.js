import express from 'express';
import cors from 'cors';
import data from './data.js';

const app = express();
app.use(cors());

app.get('/api/products', (req, res) => {
  res.json(data.products);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('server stated at port:' + port));
