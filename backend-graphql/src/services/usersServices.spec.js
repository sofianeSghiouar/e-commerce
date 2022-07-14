import { jest, describe, it, expect } from "@jest/globals";
import mockbcrypt from "bcryptjs";
import mockJwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import UsersServices from "./usersServices.js";

jest.mock("../models/user.js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
describe("usersServices", () => {
  describe("login()", () => {
    it("should throw an error when passing in login function an incorrect email format", async () => {
      UserModel.findOne.mockResolvedValue({
        _id: "some id",
        _doc: { _id: "mongooseId", username: "username", email: "some@email" }
      });
      mockbcrypt.compareSync.mockResolvedValue(true);
      mockJwt.sign.mockResolvedValue("accessToken");
      const credentials = {
        email: "incorrectEmail",
        password: "password"
      };
      const usersServices = new UsersServices();

      try {
        await usersServices.login(credentials.email, credentials.password);
      } catch (error) {
        expect(error.message).toBe("Error");
        expect(error.extensions.errors.email).toBe(
          "Email must be a valid email adress"
        );
      }
    });

    it("should return an object with an id, user data, and a token", async () => {
      mockbcrypt.compareSync.mockResolvedValue(true);
      mockJwt.sign.mockResolvedValue("accessToken");
      UserModel.findOne.mockResolvedValue({
        _id: "some id",
        _doc: { _id: "mongooseId", username: "username", email: "some@email" }
      });
      const usersServices = new UsersServices();
      const credentials = {
        email: "email@email.com",
        password: "password"
      };

      const result = await usersServices.login(
        credentials.email,
        credentials.password
      );
      expect(result).toStrictEqual({
        id: "some id",
        email: "some@email",
        _id: "mongooseId",
        username: "username",
        token: "accessToken"
      });
    });
  });
});
