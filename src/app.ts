import express, { Application } from "express";
import indexRoutes from "./routes";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(indexRoutes());
    this.app.use("/users", userRoutes());
    this.app.use("/auth", authRoutes());
  }
}
