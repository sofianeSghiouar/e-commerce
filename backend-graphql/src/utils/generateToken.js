import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.SECRET,
    { expiresIn: '30d' }
  );
  return token;
};
