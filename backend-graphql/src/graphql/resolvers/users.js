import bcrypt from 'bcryptjs';

import UserModel from '../../models/user.js';
import { generateToken } from '../../utils/generateToken.js';

export default {
  Query: {
    userLogin: async (_, args) => {
      console.log('args login', args);
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
      // return {error: {message: "Invalid email or password"}}
      throw new Error("invalid email or password")
    },
    userRegister: async (_, args) => {
      console.log('args register', args);
      const {
        registerInput: { username, email, password, confirmPassword },
      } = args;
      const user = await UserModel.findOne({ email: email });
      if (user) {
        return { error: { message: 'this email already have an account !' } };
      }
      if (password === confirmPassword) {
        const newUser = await UserModel.createOne({
          username,
          email,
          password: bcrypt.hashSync(password),
        });
        console.log('newUser :>> ', newUser);
        return newUser
      }
      return {error: {message: " confirm password must be identique to password"}}
    },
  },
};
