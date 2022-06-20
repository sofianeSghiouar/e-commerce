import bcrypt from 'bcryptjs';

import UserModel from '../../models/user.js';
import { generateToken } from '../../utils/generateToken.js';

export default {
  Query: {
    getUser: async (_, args) => {
      const user = await UserModel.findOne({ email: args.email });
      if (user) {
        if (bcrypt.compareSync(args.password, user.password)) {
          return {
            _id: user._id,
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
