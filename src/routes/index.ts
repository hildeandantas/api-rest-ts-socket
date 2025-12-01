import express from "express";

const indexRoutes = () => {
  const router = express.Router();

  const environment = process.env.NODE_ENV || 'local';


  router.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!", ambiente: environment });
  });

  return router;
};

export default indexRoutes;
