import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";

export default class UserServices {
  async login(password, email, res) {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
          token: await generateToken(user)
        };
      }
    }
    throw new Error("User not found");
  }
  async register(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error("Passwords not match");
    }

    if (await UserModel.findOne({ email: email })) {
      throw new Error("User already exist");
    }
    const user = new UserModel({
      username: name,
      email,
      password,
      isAdmin: true
    });
    user.password = bcrypt.hashSync(password);
    try {
      const newUser = await user.save();
      const token = await generateToken({
        username: newUser.username,
        email: newUser.email,
        id: newUser._id
      });
      return {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        createdAt: user.createdAt,
        token
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
