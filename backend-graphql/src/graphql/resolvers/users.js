import bcrypt from 'bcryptjs';

import UserModel from '../../models/user.js';
import { generateToken } from '../../utils/generateToken.js';

export default {
  Query: {
    userLogin: async (_, args) => {
      console.log('args', args);
      const user = await UserModel.findOne({ email: args.loginInput.email });
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
