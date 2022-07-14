import bcrypt from "bcryptjs";
import { UserInputError } from "apollo-server";
import UserModel from "../../models/user.js";
import { generateToken } from "../../utils/generateToken.js";
import {
  validateLoginInput,
  validateRegisterInput
} from "../../utils/validators.js";
export default {
  Mutation: {
    userLogin: async (_, { loginInput: { email, password } }) => {
      const { valid, errors } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError("Error", {
          errors
        });
      }

      const user = await UserModel.findOne({
        email: email
      });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", {
          errors
        });
      }

      const match = bcrypt.compareSync(password, user.password);

      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", {
          errors
        });
      }

      const token = generateToken(user);
      return {
        id: user._id,
        ...user._doc,
        token
      };
    },
    userRegister: async (
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Error", {
          errors
        });
      }

      const user = await UserModel.findOne({
        email: email
      });

      if (user) {
        throw new UserInputError("This email is taken !");
      }

      try {
        const newUser = await UserModel({
          username,
          email,
          password: bcrypt.hashSync(password),
          createdAt: new Date().toISOString()
        });
        const result = await newUser.save();
        const token = generateToken(result);
        console.log("newUser :>> ", result);
        return { ...result._doc, id: result._id, token };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};
