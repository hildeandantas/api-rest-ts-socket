import e from "express";
import AuthController from "../controllers/authController";

const authRoutes = () => {
  const router = e.Router();

  router.get("/login", AuthController.login);

  return router;
};

export default authRoutes;
