import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import start from './db/connect.js';
dotenv.config()

import productsRoutes from './controllers/products/routes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', productsRoutes)


const PORT = process.env.PORT || 8000;

start().then(() => {
  return app.listen(PORT, () => console.log('Server started at PORT:' + PORT));
});
