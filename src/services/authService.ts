import BcryptUtil from "../utils/bcrypt";
import UserService from "./userService";
import { sign } from "jsonwebtoken";
import { AppError } from "../utils/AppError"; // Importe a classe criada acima
import "dotenv/config";

export default class AuthService {
  private static generateToken(payload: object) {
    if (!process.env.JWT_SECRET) {
      throw new AppError("Configuration error: JWT_SECRET not found", 500);
    }
    return sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  }

  static async login(email: string, password: string) {
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    const isPasswordValid = await BcryptUtil.hashAndCompare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    const token = this.generateToken({ id: user.id, email: user.email });
    const { password: _, ...userWithoutPassword } = user; 

    return {
      token,
      user: userWithoutPassword,
    };
  }
}