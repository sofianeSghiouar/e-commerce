import jwt from "jsonwebtoken";

export default async function verifyToken(token) {
  try {
    const user = jwt.verify(token, process.env.SECRET);
    return user ? user : false;
  } catch (error) {
    throw new Error(error);
  }
}
