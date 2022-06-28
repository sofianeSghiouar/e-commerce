import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server';

import { generateToken } from '../../utils/generateToken.js';
import UserModel from '../../models/user.js';
import {
  validateLoginInput,
  validateRegisterInput
} from '../../utils/validators.js';
import UsersServices from '../../services/usersServices.js';

const usersServices = new UsersServices();
export default {
  Mutation: {
    userLogin: async (_, { loginInput: { email, password } }) => {
      const result = await usersServices.login(email, password);
      return result;
    },
    userRegister: async (
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      const result = await usersServices.register(
        username,
        email,
        password,
        confirmPassword
      );

      return result;
    }
  }
};
