import jwt from 'jsonwebtoken';

export default async function isAuth(req, res, next) {
  try {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders.split(' ')[1];
    const decodedUser = jwt.verify(token, process.env.SECRET);
    req.user = decodedUser;
    next();
  } catch (error) {
    throw new Error(error);
  }
}
