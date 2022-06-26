import UserModel from '../../models/user.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/generateToken.js';

export class UsersController {
  async handleLogin({ body: { password, email } }, res) {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user)
        };
      }
    }

    res.status(401).json({ message: 'Invalid email or password' });
  }
}
