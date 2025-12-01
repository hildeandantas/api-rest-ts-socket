import { Request, Response } from "express";
import AuthService from "../services/authService";
import { AppError } from "../utils/AppError"; // Não esqueça de importar a classe de erro

export default class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw new AppError("Email and password are required", 400);
      }

      const result = await AuthService.login(email, password);
      return res.status(200).json(result);

    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error("Login unexpected error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}