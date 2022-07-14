import UserServices from "../../services/usersServices.js";
export class UsersController {
  usersServices = new UserServices();

  async handleLogin({ body }, res) {
    const { password, email } = body;
    const userLogin = await this.usersServices.login(password, email, res);
    return userLogin;
  }

  async handleRegister({ body }) {
    const { name, email, password, confirmPassword } = body;
    const userRegister = await this.usersServices.register(
      name,
      email,
      password,
      confirmPassword
    );
    return userRegister;
  }
}
