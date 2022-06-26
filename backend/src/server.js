import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import start from './db/connect.js';

import productsRouter from './controllers/products/routes.js';
import usersRouter from './controllers/users/routes.js';
import seedRouter from './controllers/seed/route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', productsRouter);
app.use('/api', usersRouter);

app.use('/api', seedRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 8000;

start().then(() =>
  app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))
);
