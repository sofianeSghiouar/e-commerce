import jwt from 'jsonwebtoken';

export async function generateToken(user) {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
}
