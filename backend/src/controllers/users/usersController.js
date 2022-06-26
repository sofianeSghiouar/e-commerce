import UserServices from '../../services/usersServices.js';

export class UsersController {
  usersServices = new UserServices();

  async loginService({ body }, res) {
    const { password, email } = body;
    const userLogin = await this.usersServices.handleLogin(
      password,
      email,
      res
    );
    return userLogin;
  }

  async registerService({ body }) {
    const { name, email, password, confirmPassword } = body;
    try {
      const userRegister = await this.usersServices.handleRegister(
        name,
        email,
        password,
        confirmPassword
      );
      return userRegister;
    } catch (error) {
      throw new Error(error);
    }
  }
}
