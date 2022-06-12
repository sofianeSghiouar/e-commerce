import express from 'express';
import expressAsyncHandler from 'express-async-handler';

export function createRouter(routes) {
  const router = express.Router();
  routes.forEach((route) => {
    const method = route.method.toLowerCase();
    router[method](route.path, createHandler(route));
  });
  return router;
}

export function createHandler({ handler, responseStatus = 200 }) {
  return expressAsyncHandler(async (req, res) => {
    try {
      const result = await handler(req, res);
      if (res !== result) {
        res.status(responseStatus).json(result);
      }
      result
    } catch (e) {
      return res.status(e.status || 500).json({
        name: e.name || 'INTERNAL_ERROR',
        message: e.message,
        status: e.status || 500,
        stack: process.env.NODE_ENV !== 'production' ? e.stack : null,
      });
    }
  });
}
