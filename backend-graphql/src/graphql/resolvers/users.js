import bcrypt from 'bcryptjs';

import UserModel from '../../models/user.js';
import { generateToken } from '../../utils/generateToken.js';

export default {
  Query: {
    handleLogin: async (_, args) => {
      console.log(args);
      const user = await UserModel.findOne({ email: args.loginInput.email });
      console.log(user);
      if (user) {
        if (bcrypt.compareSync(args.loginInput.password, user.password)) {
          return {
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          };
        }
      }
    },
  },
};
